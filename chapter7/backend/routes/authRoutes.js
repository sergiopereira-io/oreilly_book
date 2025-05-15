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
