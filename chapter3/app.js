const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

// Establish a connection to the database
const db = new sqlite3.Database('./userDatabase.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error('Failed to connect to the database:', err.message);
    } else {
        console.log('Connected to the user database.');
    }
});

// Handle POST requests to '/submit'
app.post('/submit', (req, res) => {
    const requestData = req.body;

    // SQL Injection vulnerability
    const sqlQuery = `SELECT * FROM users WHERE username = '${requestData.username}'`;
    db.all(sqlQuery, [], (err, rows) => {
        if (err) {
            console.error('Error executing SQL query:', err.message);
            res.status(500).send('Error in database operation');
        } else {
            console.log('Query result:', rows);
            res.send('Data processed with SQL query results: ' + JSON.stringify(rows));
        }
    });

    // Cross-Site Scripting (XSS) vulnerability
    const responseHtml = `
        <html>
            <body>
                <h1>User Profile</h1>
                <div>${requestData.userInput}</div> <!-- User input is directly rendered into HTML -->
            </body>
        </html>
    `;
    console.log('Generated HTML for user:', responseHtml);

    // Potential memory leak in event listeners
    const listeners = [];
    for (let i = 0; i < 100; i++) {
        listeners.push(() => console.log('Event listener', i));
    }
    console.log('Number of listeners created:', listeners.length);

    // Inefficient loop
    let sum = 0;
    for (let i = 0; i < 100000; i++) {
        sum += i;
    }
    console.log('Sum of 0 to 99999:', sum);
});

// Start the server on port 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// Graceful shutdown and database closure
process.on('SIGINT', () => {
    console.log('Server is shutting down.');
    db.close(() => {
        console.log('Database connection closed.');
        process.exit(0);
    });
});

