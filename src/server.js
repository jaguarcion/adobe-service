const express = require('express');
const cors = require('cors');
const cron = require('node-cron');
const path = require('path');
const { getDb } = require('./db');
const { validateAdminToken, encrypt } = require('./crypto');
const { runWorker } = require('./worker');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));

app.use(cors()); // Allow all origins for the Next.js frontend
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Middleware: Verify Admin Token
 */
function adminAuth(req, res, next) {
    // Check headers first (for API), then query/body (for legacy views)
    const token = req.headers['authorization']?.replace('Bearer ', '') || req.query.token || req.body.token;
    if (!validateAdminToken(token)) {
        return res.status(403).json({ error: 'Forbidden: Invalid Token' });
    }
    res.locals.token = token;
    next();
}

/**
 * Legacy Client page
 */
app.get('/account/:id', async (req, res) => {
    try {
        const accountId = parseInt(req.params.id, 10);
        if (isNaN(accountId)) {
            return res.status(400).send('Invalid Account ID');
        }

        const db = await getDb();
        const account = await db.get('SELECT login, data_encrypted, organization, org_status FROM accounts WHERE id = ?', [accountId]);
        
        if (!account) {
            return res.status(404).render('client', {
                error: true,
                message: 'Аккаунт не найден.',
                organization: null,
                login: null,
                password: null
            });
        }
        
        let message = '';
        if (account.org_status === 'disabled' || account.org_status === 'error') {
            message = 'Идет обновление организации, пожалуйста, подождите или обновите страницу позже.';
        } else if (!account.organization) {
            message = 'Организация еще не назначена.';
        }

        let password = null;
        try {
            if (account.data_encrypted) {
                const decrypted = encrypt.decrypt ? encrypt.decrypt(account.data_encrypted) : require('./crypto').decrypt(account.data_encrypted);
                const parsed = JSON.parse(decrypted);
                password = parsed.password || null;
            }
        } catch (e) {
            console.error('Failed to decrypt password:', e);
        }

        res.render('client', {
            error: false,
            message,
            organization: account.organization,
            login: account.login,
            password: password
        });
    } catch (err) {
        console.error('[Server] DB Error:', err);
        res.status(500).send('Internal Server Error');
    }
});


// ==========================================
// NEW REST API FOR NEXT.JS ADMIN DASHBOARD
// ==========================================

// Dashboard Stats
app.get('/api/stats', adminAuth, async (req, res) => {
    try {
        const db = await getDb();
        const totalAccounts = await db.get('SELECT COUNT(*) as count FROM accounts');
        const activeAccounts = await db.get("SELECT COUNT(*) as count FROM accounts WHERE org_status = 'ok' OR org_status = 'switched'");
        const totalClients = await db.get('SELECT COUNT(*) as count FROM clients');
        
        res.json({
            accounts: totalAccounts.count,
            activeAccounts: activeAccounts.count,
            clients: totalClients.count
        });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Accounts API
app.get('/api/accounts', adminAuth, async (req, res) => {
    try {
        const db = await getDb();
        // Also get assigned client email if any
        const accounts = await db.all(`
            SELECT a.id, a.login, a.organization, a.org_status, a.org_checked_at, a.expires_at, a.client_id, c.email as client_email 
            FROM accounts a
            LEFT JOIN clients c ON a.client_id = c.id
            ORDER BY a.id DESC
        `);
        res.json(accounts);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

app.post('/api/accounts', adminAuth, async (req, res) => {
    const { login, password } = req.body;
    if (!login || !password) return res.status(400).json({ error: 'Login and password required' });
    try {
        const dataToEncrypt = JSON.stringify({ password });
        const encryptedData = require('./crypto').encrypt(dataToEncrypt);
        const db = await getDb();
        const result = await db.run(
            'INSERT INTO accounts (login, data_encrypted, manual_issued_at) VALUES (?, ?, datetime("now"))',
            [login, encryptedData]
        );
        res.json({ success: true, id: result.lastID });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

app.post('/api/accounts/:id/assign', adminAuth, async (req, res) => {
    const accountId = req.params.id;
    const { client_id } = req.body;
    try {
        const db = await getDb();
        await db.run('UPDATE accounts SET client_id = ?, claimed_at = datetime("now") WHERE id = ?', [client_id, accountId]);
        res.json({ success: true });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Clients API
app.get('/api/clients', adminAuth, async (req, res) => {
    try {
        const db = await getDb();
        // Get clients with their assigned account
        const clients = await db.all(`
            SELECT c.*, a.login as account_login, a.id as account_id, a.org_status, a.organization
            FROM clients c
            LEFT JOIN accounts a ON a.client_id = c.id
            ORDER BY c.id DESC
        `);
        res.json(clients);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

app.post('/api/clients', adminAuth, async (req, res) => {
    const { email, telegram, subscription_ends_at } = req.body;
    try {
        const db = await getDb();
        const result = await db.run(
            'INSERT INTO clients (email, telegram, subscription_ends_at) VALUES (?, ?, ?)',
            [email, telegram, subscription_ends_at || null]
        );
        res.json({ success: true, id: result.lastID });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Worker Trigger
app.post('/api/worker/force', adminAuth, (req, res) => {
    runWorker(50, 250).catch(console.error);
    res.json({ success: true, message: 'Worker started in background.' });
});

// Start Cron Job
const schedule = process.env.CRON_SCHEDULE || '*/15 * * * *';
cron.schedule(schedule, () => {
    console.log(`[Cron] Triggering worker at ${new Date().toISOString()}`);
    runWorker(50, 250).catch(console.error);
});

// Start Server
app.listen(port, () => {
    console.log(`[Server] Listening on port ${port}`);
});
