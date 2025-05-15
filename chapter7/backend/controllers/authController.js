// Register user
const register = (db) => async (req, res) => {
    const { email, password } = req.body;
    const stmt = db.prepare('INSERT INTO users (email, password) VALUES (?, ?)');
    stmt.run(email, password, function (err) {
      if (err) {
        return res.status(400).json({ message: 'Error registering user', error: err.message });
      }
      res.status(201).json({ message: 'User registered successfully', user: { id: this.lastID, email } });
    });
  };
  
  // Login user
  const login = (db) => async (req, res) => {
    const { email, password } = req.body;
    const stmt = db.prepare('SELECT * FROM users WHERE email = ? AND password = ?');
    stmt.get(email, password, (err, row) => {
      if (err) {
        return res.status(500).json({ message: 'Error logging in', error: err.message });
      }
      if (!row) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      res.status(200).json({ message: 'Login successful', user: row });
    });
  };
  
  module.exports = { register, login };
  