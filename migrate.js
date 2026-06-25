const { getDb } = require('./src/db');

async function migrate() {
    const db = await getDb();
    try {
        console.log('Creating clients table...');
        await db.exec(`
            CREATE TABLE IF NOT EXISTS clients (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT,
                telegram TEXT,
                connected_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                subscription_ends_at DATETIME
            )
        `);

        console.log('Altering accounts table...');
        try {
            await db.exec(`ALTER TABLE accounts ADD COLUMN expires_at DATETIME;`);
            console.log('Added expires_at column.');
        } catch (e) {
            console.log('expires_at column might already exist.');
        }

        try {
            await db.exec(`ALTER TABLE accounts ADD COLUMN client_id INTEGER REFERENCES clients(id);`);
            console.log('Added client_id column.');
        } catch (e) {
            console.log('client_id column might already exist.');
        }

        console.log('Migration complete.');
    } catch (e) {
        console.error('Migration failed:', e);
    }
}

migrate();
