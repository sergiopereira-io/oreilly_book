---
title: Frontend test plan
---
# Introduction

This document will walk you through the frontend implementation of a user authentication system. The purpose is to understand the design decisions and create a test plan for each flow.

We will cover:

1. How the login and registration forms are structured.
2. The logic for switching between login and registration forms.
3. The handling of login and registration submissions.
4. The display of success messages and logout functionality.

# Form structure

The HTML structure includes both login and registration forms. The login form is visible by default, while the registration form is initially hidden.

### Login form

<SwmSnippet path="/chapter7/frontend/index.html" line="15">

---

The login form captures user email and password inputs.

```
  <!-- Login Form -->
  <div id="loginFormContainer" class="form-container">
    <h2>Login</h2>
    <form id="loginForm">
      <label for="loginEmail">Email:</label>
      <input type="email" id="loginEmail" name="email" required /><br><br>

      <label for="loginPassword">Password:</label>
      <input type="password" id="loginPassword" name="password" required /><br><br>

      <button type="submit">Login</button>
    </form>
    <p>Don't have an account? <a href="javascript:void(0);" id="showRegisterLink">Register here</a></p>
  </div>
```

---

</SwmSnippet>

### Registration form

<SwmSnippet path="/chapter7/frontend/index.html" line="30">

---

The registration form is similar to the login form but is initially hidden and includes a link to switch back to the login form.

```
  <!-- Register Form -->
  <div id="registerFormContainer" class="form-container hidden">
    <h2>Register</h2>
    <form id="registerForm">
      <label for="registerEmail">Email:</label>
      <input type="email" id="registerEmail" name="email" required /><br><br>

      <label for="registerPassword">Password:</label>
      <input type="password" id="registerPassword" name="password" required /><br><br>

      <button type="submit">Register</button>
    </form>
    <p>Already have an account? <a href="javascript:void(0);" id="showLoginLink">Login here</a></p>
  </div>
```

---

</SwmSnippet>

# Form switching logic

JavaScript is used to toggle visibility between the login and registration forms. This allows users to switch forms without reloading the page.

### Show register form

<SwmSnippet path="/chapter7/frontend/index.html" line="51">

---

When the "Register here" link is clicked, the login form is hidden, and the registration form is displayed.

```
  <script>
    // Show Register Form
    document.getElementById('showRegisterLink').addEventListener('click', () => {
      document.getElementById('loginFormContainer').classList.add('hidden');
      document.getElementById('registerFormContainer').classList.remove('hidden');
    });
```

---

</SwmSnippet>

### Show login form

<SwmSnippet path="/chapter7/frontend/index.html" line="58">

---

Conversely, clicking the "Login here" link hides the registration form and shows the login form.

```
    // Show Login Form
    document.getElementById('showLoginLink').addEventListener('click', () => {
      document.getElementById('registerFormContainer').classList.add('hidden');
      document.getElementById('loginFormContainer').classList.remove('hidden');
    });
```

---

</SwmSnippet>

# Form submission handling

The submission of both forms is handled via JavaScript, which sends the data to the backend API.

### Handle login

<SwmSnippet path="/chapter7/frontend/index.html" line="64">

---

The login form submission is intercepted to prevent default behavior. The email and password are sent to the login API endpoint.

```
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
```

---

</SwmSnippet>

### Handle registration

<SwmSnippet path="/chapter7/frontend/index.html" line="84">

---

Similarly, the registration form submission sends the user's email and password to the registration API endpoint.

```
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
```

---

</SwmSnippet>

# Success and logout functionality

Upon successful login or registration, a success message is displayed, and the user is given the option to log out.

### Show success page

<SwmSnippet path="/chapter7/frontend/index.html" line="104">

---

The success page displays a message and hides both forms, indicating a successful operation.

```
    // Show Success Page
    function showSuccessPage(message) {
      document.getElementById('successMessage').innerText = message;
      document.getElementById('loginFormContainer').classList.add('hidden');
      document.getElementById('registerFormContainer').classList.add('hidden');
      document.getElementById('successPage').classList.remove('hidden');
    }
```

---

</SwmSnippet>

### Handle logout

<SwmSnippet path="/chapter7/frontend/index.html" line="112">

---

The logout button returns the user to the login form, hiding the success message.

```
    // Handle Logout
    document.getElementById('logoutButton').addEventListener('click', () => {
      document.getElementById('successPage').classList.add('hidden');
      document.getElementById('loginFormContainer').classList.remove('hidden');
    });
```

---

</SwmSnippet>

# Test plan

### Test login flow

1. Verify the login form is visible by default.
2. Enter valid credentials and submit; expect a success message.
3. Enter invalid credentials and submit; expect an error alert.
4. Click "Register here" and ensure the registration form appears.

### Test registration flow

1. Click "Register here" to switch to the registration form.
2. Enter valid details and submit; expect a success message.
3. Enter invalid details and submit; expect an error alert.
4. Click "Login here" and ensure the login form reappears.

### Test success and logout

1. After successful login or registration, verify the success message is displayed.
2. Click the logout button and ensure the login form is shown again.

<SwmMeta version="3.0.0" repo-id="Z2l0aHViJTNBJTNBb3JlaWxseV9ib29rJTNBJTNBc2VyZ2lvcGVyZWlyYS1pbw==" repo-name="oreilly_book"><sup>Powered by [Swimm](https://app.swimm.io/)</sup></SwmMeta>
