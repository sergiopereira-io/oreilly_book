---
title: Authentication flow
---
# Introduction

This document will walk you through the authentication flow implemented in the backend server. The purpose of this implementation is to manage user authentication using a <SwmToken path="/chapter7/backend/server.js" pos="11:10:10" line-data="// Create or open the SQLite database file">`SQLite`</SwmToken> database and Express.js.

We will cover:

1. Why we use <SwmToken path="/chapter7/backend/server.js" pos="11:10:10" line-data="// Create or open the SQLite database file">`SQLite`</SwmToken> for user data storage.
2. How the authentication routes are integrated.
3. The server setup and its components.

# Database setup

<SwmToken path="/chapter7/backend/server.js" pos="11:10:10" line-data="// Create or open the SQLite database file">`SQLite`</SwmToken> is chosen for its simplicity and ease of use in small to medium-sized applications. It allows us to store user credentials without the overhead of a full-fledged database server.

<SwmSnippet path="/chapter7/backend/server.js" line="11">

---

We initialize the <SwmToken path="/chapter7/backend/server.js" pos="11:10:10" line-data="// Create or open the SQLite database file">`SQLite`</SwmToken> database and ensure a connection is established:

```
// Create or open the SQLite database file
const db = new sqlite3.Database('./userAuth.db', (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});
```

---

</SwmSnippet>

# Table creation and route integration

To store user credentials, we create a 'users' table if it doesn't already exist. This ensures that our application can handle user data persistently.

<SwmSnippet path="/chapter7/backend/server.js" line="20">

---

The authentication routes are then integrated with the server, allowing us to handle authentication-related requests:

```
// Create Users table if it doesn't exist
db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, password TEXT)');

// Use the routes for authentication
app.use('/api/auth', authRoutes(db));

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
```

---

</SwmSnippet>

# Server configuration

The server is set up using Express.js, which is a minimal and flexible Node.js web application framework. We enable CORS to allow cross-origin requests, which is essential for frontend-backend communication in different domains.

<SwmSnippet path="/chapter7/backend/server.js" line="1">

---

The server listens on a specified port, making it accessible for handling incoming requests:

```
const express = require('express');
const cors = require('cors'); // Import the CORS package
const sqlite3 = require('sqlite3').verbose();
const authRoutes = require('./routes/authRoutes');
const app = express();
const port = 3000;

app.use(cors()); // Enable CORS for all routes
app.use(express.json());
```

---

</SwmSnippet>

This setup provides a straightforward and efficient way to manage user authentication in our application.

<SwmMeta version="3.0.0" repo-id="Z2l0aHViJTNBJTNBb3JlaWxseV9ib29rJTNBJTNBc2VyZ2lvcGVyZWlyYS1pbw==" repo-name="oreilly_book"><sup>Powered by [Swimm](https://app.swimm.io/)</sup></SwmMeta>
