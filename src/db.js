const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const path = require('path');
const fs = require('fs');

let dbPromise = null;

async function getDb() {
    if (!dbPromise) {
        dbPromise = open({
            filename: path.join(__dirname, '..', 'database.sqlite'),
            driver: sqlite3.Database
        }).then(async (db) => {
            // Run schema initialization on first connection
            const schemaPath = path.join(__dirname, '..', 'schema.sql');
            if (fs.existsSync(schemaPath)) {
                const schema = fs.readFileSync(schemaPath, 'utf-8');
                await db.exec(schema);
            }
            return db;
        });
    }
    return dbPromise;
}

module.exports = { getDb };
