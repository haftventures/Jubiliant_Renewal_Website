// config/sessionConfig.js
const session = require('express-session');

module.exports = session({
  secret: 'secret123',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 20 * 60 * 1000 } // 20 minutes
});
