const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create DB file
const dbPath = path.join(__dirname, '../database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('❌ SQLite connection error:', err.message);
    } else {
        console.log('✅ SQLite connected');
    }
});

module.exports = db;