// routes/index.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// ✅ Middleware to protect routes
function ensureAuthenticated(req, res, next) {
  if (req.session.AgntDtl) return next();
  return res.redirect('/');
}

// ✅ Dynamic page loader
router.get('/:page', ensureAuthenticated, (req, res) => {
  const filePath = path.join(__dirname, '../views', `${req.params.page}.ejs`);
  if (fs.existsSync(filePath)) {
    res.render(req.params.page);
  } else {
    res.status(404).send('Page not found');
  }
});

module.exports = router;
