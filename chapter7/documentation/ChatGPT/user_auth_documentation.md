
# User Authentication Codebase Documentation

---

## **Overview**
This codebase implements a basic user authentication system (Register/Login) with a **frontend** and **backend** structure. The backend uses **Node.js** with **SQLite** as the database, while the frontend is a simple **HTML/CSS/JS** interface for interacting with the backend.

This system is functional, lightweight, and ideal for demonstrating foundational authentication workflows.

---

## **Repository Structure**

### Backend
- **controllers/**
  - `authController.js`: Handles business logic for user registration and login workflows.
- **models/**
  - `user.js`: Defines the **User Schema** using Mongoose (future-ready for MongoDB).
- **routes/**
  - `authRoutes.js`: Defines and handles API endpoints for authentication.
- **server.js**: Main entry point for starting the server and initializing the SQLite database.

### Frontend
- **index.html**: Contains the user interface for Login, Registration, and Success Page.
- **userAuth.db**: SQLite database file for storing user credentials.

---

## **Functional Workflow**

### **1. User Registration**
**Frontend**:
- A form allows users to input **email** and **password**.
- Sends a `POST` request to `/api/auth/register`.

**Backend**:
- **Route**: `POST /api/auth/register`
- **Controller**: 
  - Validates input and stores user credentials in the SQLite database.
  - On success: Returns confirmation.
  - On error: Returns an appropriate error message.

**Database**:
- Stores user credentials in the `users` table:
  ```sql
  CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT
  );
  ```

---

### **2. User Login**
**Frontend**:
- A form allows users to input **email** and **password**.
- Sends a `POST` request to `/api/auth/login`.

**Backend**:
- **Route**: `POST /api/auth/login`
- **Controller**:
  - Checks user credentials against the database.
  - On success: Returns user data and success message.
  - On failure: Returns an error message.

---

### **3. Frontend Behavior**
The `index.html` provides:
1. **Login Form**: Default view.
2. **Register Form**: Hidden until toggled.
3. **Success Page**: Displayed after successful login or registration.

#### Features:
- JavaScript dynamically toggles between login and registration forms.
- Success messages are displayed post-login/registration.
- Logout resets the UI to the login screen.

---

## **Technical Implementation**

### **Backend**
1. **Server Initialization** (`server.js`)
   - Starts an Express server on `http://localhost:3000`.
   - Initializes the SQLite database and ensures the `users` table exists.
   - Integrates authentication routes.

2. **Authentication Logic** (`authController.js`)
   - `register`: Inserts a new user into the SQLite database.
   - `login`: Verifies the user’s email and password.

3. **Routing** (`authRoutes.js`)
   - Maps endpoints `/register` and `/login` to controller functions.

4. **Database**:
   - SQLite handles data persistence for this MVP.

### **Frontend**
1. **HTML Structure** (`index.html`)
   - Contains forms for registration and login.
   - Success page UI for user feedback.

2. **JavaScript Logic**:
   - Sends HTTP requests to the backend using the `fetch` API.
   - Dynamically handles UI updates for form switching and success display.

---

## **APIs**

### **Register User**
- **Endpoint**: `POST /api/auth/register`
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  - **Success**: `201 Created`
    ```json
    {
      "message": "User registered successfully",
      "user": { "id": 1, "email": "user@example.com" }
    }
    ```
  - **Error**: `400 Bad Request`
    ```json
    { "message": "Error registering user", "error": "<error details>" }
    ```

### **Login User**
- **Endpoint**: `POST /api/auth/login`
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  - **Success**: `200 OK`
    ```json
    {
      "message": "Login successful",
      "user": { "id": 1, "email": "user@example.com", "password": "password123" }
    }
    ```
  - **Error**: `401 Unauthorized`
    ```json
    { "message": "Invalid credentials" }
    ```

---

## **Future Improvements**
1. **Password Hashing**: Store hashed passwords using libraries like `bcrypt`.
2. **Session Management**: Use JWT tokens or sessions for authentication.
3. **Frontend Styling**: Improve the UI/UX with frameworks like **Bootstrap**.
4. **Error Handling**: Add more robust validation and error messaging.
5. **Database Migration**: Switch from SQLite to MongoDB or a relational DBMS for production.

---

## **How to Run Locally**

### Prerequisites:
- **Node.js** and **npm** installed.

### Steps:
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install express cors sqlite3
   ```
3. Start the server:
   ```bash
   node server.js
   ```
4. Open `index.html` in a browser.
5. Test the user registration and login features.

---

## **Conclusion**
This codebase provides a clear, modular implementation of user authentication. It is suitable as a foundation for further development or as a learning resource for understanding full-stack development workflows.
