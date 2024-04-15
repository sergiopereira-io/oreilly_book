const sqlite3 = require('sqlite3').verbose();

// Connect to SQLite database
const db = new sqlite3.Database('./userDatabase.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the user database.');
});

// Create table
db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL
)`, (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Users table created or already exists.');
});

// Insert sample data
db.run(`INSERT INTO users (username) VALUES ('Alice'), ('Bob')`, (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Sample user data inserted');
});

// Close the database connection
db.close((err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Database connection closed.');
});
