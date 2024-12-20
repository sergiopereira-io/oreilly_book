# User Authentication System Documentation

## Overview

This is a full-stack user authentication system implementing registration and login functionality. The system uses a Node.js/Express backend with SQLite database and a vanilla JavaScript frontend.

### Key Features
- User registration
- User login
- Form switching interface
- Success/failure feedback
- Logout functionality

## System Architecture

### Technology Stack
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: SQLite
- **API Communication**: REST endpoints with JSON

## Functional Workflows

### 1. User Registration Flow

**User Perspective:**
1. User clicks "Register here" link
2. Fills email and password
3. Submits registration form
4. Receives success/error feedback

**Technical Implementation:**
- Frontend form handling:
    // Handle Register
    document.getElementById('registerForm').addEventListener('submit', async (event) => {
      event.preventDefault();
      const email = document.getElementById('registerEmail').value;
      const password = document.getElementById('registerPassword').value;

      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const result = await response.json();
      if (response.ok) {
        showSuccessPage('Registration successful!');
      } else {
        alert(result.message);
      }
    });


- Backend registration endpoint:
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

### 2. User Login Flow

**User Perspective:**
1. User enters email and password
2. Submits login form
3. Receives success/error feedback
4. On success, sees welcome message

**Technical Implementation:**
- Frontend login handling:
    // Handle Login
    document.getElementById('loginForm').addEventListener('submit', async (event) => {
      event.preventDefault();
      const email = document.getElementById('loginEmail').value;
      const password = document.getElementById('loginPassword').value;

      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const result = await response.json();
      if (response.ok) {
        showSuccessPage('Login successful!');
      } else {
        alert(result.message);
      }
    });

-Backend login endpoint:
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
## Technical Implementation Details

### Database Schema

The system uses a simple SQLite database with a users table:
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT
);


### API Endpoints

#### 1. Register User
- **Endpoint**: `POST /api/auth/register`
- **Request Body**:
{
    "email": "user@example.com",
    "password": "userpassword"
}

- **Success Response** (201 Created):
{
    "message": "User registered successfully",
    "user": {
        "id": 1,
        "email": "user@example.com"
    }
}


#### 2. Login User
- **Endpoint**: `POST /api/auth/login`
- **Request Body**:
{
    "email": "user@example.com",
    "password": "userpassword"
}


- **Success Response** (200 OK):
{
    "message": "Login successful",
    "user": {
        "id": 1,
        "email": "user@example.com"
    }
}


### Frontend Components

#### Form Management
The frontend implements dynamic form switching using CSS classes:
  <script>
    // Show Register Form
    document.getElementById('showRegisterLink').addEventListener('click', () => {
      document.getElementById('loginFormContainer').classList.add('hidden');
      document.getElementById('registerFormContainer').classList.remove('hidden');
    });

    // Show Login Form
    document.getElementById('showLoginLink').addEventListener('click', () => {
      document.getElementById('registerFormContainer').classList.add('hidden');
      document.getElementById('loginFormContainer').classList.remove('hidden');
    });


#### Success Page Handling
    // Show Success Page
    function showSuccessPage(message) {
      document.getElementById('successMessage').innerText = message;
      document.getElementById('loginFormContainer').classList.add('hidden');
      document.getElementById('registerFormContainer').classList.add('hidden');
      document.getElementById('successPage').classList.remove('hidden');
    }


### Backend Components

#### Server Configuration
The Express server setup with CORS and database initialization:
const express = require('express');
const cors = require('cors'); // Import the CORS package
const sqlite3 = require('sqlite3').verbose();
const authRoutes = require('./routes/authRoutes');
const app = express();
const port = 3000;

app.use(cors()); // Enable CORS for all routes
app.use(express.json());



#### Route Management
Authentication routes are modularly organized:
const express = require('express');
const { register, login } = require('../controllers/authController');
const router = express.Router();

module.exports = (db) => {
  // POST /api/auth/register
  router.post('/register', register(db));

  // POST /api/auth/login
  router.post('/login', login(db));

  return router;
};


## Security Considerations

Current limitations and recommended improvements:

1. **Password Security**
   - Current: Plaintext password storage
   - Recommended: Implement bcrypt hashing

2. **Session Management**
   - Current: Basic success page
   - Recommended: JWT or session-based authentication

3. **Input Validation**
   - Current: Basic HTML5 validation
   - Recommended: Server-side validation with sanitization

## Development Setup

### Prerequisites
- Node.js
- npm

### Installation Steps
1. Clone the repository
2. Install dependencies:
bash
npm install express cors sqlite3


3. Start the server:
bash
node server.js


4. Open `index.html` in a browser

## Testing Guidelines

### Frontend Testing

1. **Test login flow**
   - Verify the login form is visible by default
   - Enter valid credentials and submit; expect a success message
   - Enter invalid credentials and submit; expect an error alert
   - Click "Register here" and ensure the registration form appears

2. **Test registration flow**
   - Click "Register here" to switch to the registration form
   - Enter valid details and submit; expect a success message
   - Enter invalid details and submit; expect an error alert
   - Click "Login here" and ensure the login form reappears

3. **Test success and logout**
   - After successful login or registration, verify the success message is displayed
   - Click the logout button and ensure the login form is shown again

### API Testing
Test endpoints using tools like Postman or curl:

1. Register endpoint:
curl -X POST http://localhost:3000/api/auth/register \
-H "Content-Type: application/json" \
-d '{"email":"test@example.com","password":"test123"}'

2. Login endpoint:
curl -X POST http://localhost:3000/api/auth/login \
-H "Content-Type: application/json" \
-d '{"email":"test@example.com","password":"test123"}'


## Future Improvements

1. **Security Enhancements**
   - Implement password hashing
   - Add JWT authentication
   - Enable HTTPS

2. **Feature Additions**
   - Password reset functionality
   - Email verification
   - Remember me option

3. **Technical Improvements**
   - Add input validation middleware
   - Implement rate limiting
   - Add comprehensive error handling

This documentation provides both high-level understanding for non-technical stakeholders and detailed implementation details for developers. The modular structure allows for easy updates and maintenance as the system evolves.