// app.js
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const fs = require('fs');
const multer = require('multer');
const sessionMiddleware = require('./config/sessionConfig');

const app = express();

app.use('/Gallery', express.static(path.join(__dirname, 'Gallery')));
// ✅ File Upload Configuration
const upload = multer({
  dest: path.join(__dirname, 'uploads'),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit (optional)
});

// ✅ View engine & layouts
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'adminlayout');

// ✅ Static files
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
app.use('/static', express.static(path.join(__dirname, 'node_modules')));
app.use('/jquery-ui', express.static(path.join(__dirname, 'node_modules/jquery-ui-dist')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/downloads', express.static(path.join(__dirname, 'public/downloads')));

// app.get("/termsandconditions", (req, res) => {
//     res.sendFile(__dirname + "/public/termsandconditions.html");
// });
// app.get("/shippinganddelivery", (req, res) => {
//     res.sendFile(__dirname + "/public/shippinganddelivery.html");
// });
// app.get("/cancellationandrefund", (req, res) => {
//     res.sendFile(__dirname + "/public/cancellationandrefund.html");
// });
// app.get("/privacypolicy", (req, res) => {
//     res.sendFile(__dirname + "/public/privacypolicy.html");
// });

// ✅ Parsers
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ✅ Sessions
app.use(sessionMiddleware);

app.get("/check-session", (req, res) => {
  if (req.session?.login) {
    req.session.touch();
    return res.json({ active: true });
  }
  res.json({ active: false });
});


// ✅ Global variables for EJS
app.use((req, res, next) => {
  res.locals.login = req.session.AgntDtl || null;
  next();
});

app.get("/check-session", (req, res) => {
  res.json({ active: req.session?.login === true });
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// ✅ Routes
app.use('/', require('./routes/payment'));
app.use('/', require('./routes/policy_report'));
app.use('/', require('./routes/Make'));
app.use('/', require('./routes/Make_qc_verified'));
app.use('/', require('./routes/Make_qc3'));
app.use('/', require('./routes/policyprepare'));
app.use('/', require('./routes/auth'));
app.use('/', require('./routes/index'));


// ✅ Policy route (make sure this line is OUTSIDE any function)
// const policyRoutes = require('./routes/policyprepare');
// app.use('/', policyRoutes);


// ✅ Custom business routes
['payment', 'vehicle', 'report', 'create_user', 'success', 'kyc','Policy_details', 'mass_update_sms', 'support', 'paymentdone_routes','dashboard'].forEach(route => {
  const routePath = path.join(__dirname, 'routes', `${route}.js`);
  if (fs.existsSync(routePath)) app.use('/', require(routePath));
});


// ✅ File Upload API
app.post('/upload', upload.single('policyPdf'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded' });
  }

  res.json({
    success: true,
    message: 'File uploaded successfully',
    file: {
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      size: req.file.size,
      path: `/uploads/${req.file.filename}`
    }
  });
});

module.exports = app;
