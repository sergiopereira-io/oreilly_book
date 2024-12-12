const express = require('express');
const cors = require('cors'); // Import the CORS package
const sqlite3 = require('sqlite3').verbose();
const authRoutes = require('./routes/authRoutes');
const app = express();
const port = 3000;

app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// Create or open the SQLite database file
const db = new sqlite3.Database('./userAuth.db', (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});

// Create Users table if it doesn't exist
db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, password TEXT)');

// Use the routes for authentication
app.use('/api/auth', authRoutes(db));

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
