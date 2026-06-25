const { getDb } = require('./db');
const { subscriptionCheck, orgSwitchOptions, sleep, _orgSwitch } = require('./fivebot');
const lockfile = require('proper-lockfile');
const fs = require('fs');
const path = require('path');

// Ensure lock directory exists
const lockDir = path.join(__dirname, '..', 'tmp');
if (!fs.existsSync(lockDir)) {
    fs.mkdirSync(lockDir, { recursive: true });
}
const lockFilePath = path.join(lockDir, 'worker.lock');

// Create an empty lock file if it doesn't exist
if (!fs.existsSync(lockFilePath)) {
    fs.writeFileSync(lockFilePath, '');
}

/**
 * Resolves the organization status for a single email.
 * @param {string} email 
 * @returns {object} { status, org }
 */
async function resolve(email) {
    // 1. Получить текущую организацию
    const statusData = await subscriptionCheck(email);
    
    if (!statusData) {
        return { status: 'error', org: null }; // Network error or API down
    }
    
    if (statusData.found === false) {
        return { status: 'not_found', org: null };
    }
    
    if (!statusData.organization || !statusData.organization.name) {
        return { status: 'no_org', org: null };
    }
    
    let org = statusData.organization.name;
    let expiresAt = statusData.expiresAt || null;
    
    // 2. Проверить, не заблокирована ли организация
    const opt = await orgSwitchOptions(email);
    if (!opt) {
        // If we can't check switch options due to network, assume 'error' to retry later
        return { status: 'error', org, expiresAt }; 
    }
    
    if (opt.available !== true) {
        // Organization is fine
        return { status: 'ok', org, expiresAt };
    }
    
    // 3. Организация заблокирована -> жмём switch с повторами
    let switched = false;
    for (let i = 0; i < 20; i++) {
        const r = await _orgSwitch(email);
        if (r && !r.error) { // Успех
            switched = true;
            break;
        }
        await sleep(400); // пауза 0.4s
    }
    
    if (switched) {
        // Перечитать новое название
        const newStatus = await subscriptionCheck(email);
        const newOrg = newStatus?.organization?.name || null;
        const newExpires = newStatus?.expiresAt || expiresAt;
        return { status: 'switched', org: newOrg, expiresAt: newExpires };
    } else {
        // Не вышло переключить
        return { status: 'disabled', org: opt.currentOrgName || org, expiresAt };
    }
}

/**
 * Main worker job
 * @param {number} batchSize - How many accounts to process
 * @param {number} maxTimeSeconds - Maximum execution time
 */
async function runWorker(batchSize = 50, maxTimeSeconds = 250) {
    let release;
    try {
        // Try to acquire lock
        release = await lockfile.lock(lockFilePath, { retries: 0 });
        console.log(`[Worker] Started running at ${new Date().toISOString()}`);
    } catch (e) {
        if (e.code === 'ELOCKED') {
            console.log('[Worker] Worker is already running, skipping this iteration.');
            return;
        }
        console.error('[Worker] Failed to acquire lock:', e);
        return;
    }

    const startTime = Date.now();
    try {
        const db = await getDb();
        // Fetch accounts using the specific sorting logic from the prompt
        // SQLite supports COALESCE and boolean IS NULL sorting where true is 1 and false is 0.
        // Therefore, DESC puts true (NULLs) first.
        const query = `
            SELECT id, login, organization, org_status 
            FROM accounts
            ORDER BY 
                (org_checked_at IS NULL) DESC,
                (COALESCE(org_status,'') IN ('error','disabled')) DESC,
                org_checked_at ASC, 
                id ASC
            LIMIT ?
        `;
        
        const rows = await db.all(query, [batchSize]);
        
        console.log(`[Worker] Found ${rows.length} accounts to process.`);
        
        for (const account of rows) {
            // Check time budget
            const elapsedSeconds = (Date.now() - startTime) / 1000;
            if (elapsedSeconds > maxTimeSeconds) {
                console.log(`[Worker] Time limit of ${maxTimeSeconds}s reached. Stopping batch.`);
                break;
            }
            
            console.log(`[Worker] Processing ${account.login} (ID: ${account.id})...`);
            
            // Resolve
            const result = await resolve(account.login);
            
            // Keep old org if error/no_org to not lose it, unless explicitly empty
            let finalOrg = result.org !== null ? result.org : account.organization;
            
            // Write to DB
            const updateQuery = `
                UPDATE accounts 
                SET organization = ?, org_status = ?, org_checked_at = datetime('now'), expires_at = COALESCE(?, expires_at)
                WHERE id = ?
            `;
            await db.run(updateQuery, [finalOrg, result.status, result.expiresAt, account.id]);
            
            console.log(`[Worker] Result for ${account.login}: ${result.status}, org: ${finalOrg}`);
            
            // Polite pause between accounts
            await sleep(200); 
        }
        
    } catch (err) {
        console.error('[Worker] DB/Processing error:', err);
    } finally {
        // Release lock
        try {
            await release();
            console.log(`[Worker] Finished, lock released.`);
        } catch (e) {
            console.error('[Worker] Failed to release lock:', e);
        }
    }
}

module.exports = {
    runWorker,
    resolve
};
