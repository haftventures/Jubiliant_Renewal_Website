// routes/auth.js
const express = require('express');
const router = express.Router();
const apiCaller = require('../apicaller');
const axios = require('axios');
// ✅ Login page
router.get('/', (req, res) => {
  res.render('login', { layout: false, error: req.query.error || null });
});

// ✅ Login API
// router.post('/login', (req, res) => {
//   const { Name, Password } = req.body;

//   if (Name === 'admin' && Password === 'admin') {
//     req.session.AgntDtl = {
//       Roleid: 'admin',
//       mobileno: '1234567890',
//       Agentname: 'admin',
//       mail: 'Admin@gmail.com',
//       UserId: 'admin',
//       photo: '/assets/images/user_blaze.jpg',
//       totalearnings: '0'
//     };
//     return res.json({ success: true, redirect: '/vehicle' });
//   }

//   return res.status(401).json({ success: false, message: 'Invalid username or password.' });
// });

router.post('/login', async (req, res) => {
  try {
    const { Name, Password } = req.body || {};
    if (!Name || !Password) {
      return res.status(400).json({ success: false, message: 'Missing credentials' });
    }

    const payload = { username: Name, password: Password };

    if (typeof apiCaller === 'undefined' || !apiCaller.apicallerLivePort) {
      throw new Error('apiCaller.apicallerLivePort is not available. Make sure apiCaller is required/imported.');
    }

    const result = await apiCaller.apicallerLivePort('Policy_renewal/login_website', payload);


    if (result && result.success === true) {
      // store session details (adjust fields to match API response)
      req.session.AgntDtl = {
        Roleid: result.roleid ,

        Agentname: result.name ,
      
        UserId: result.userid ,
      
        branchid: result.branchid ,
    
      };

      return res.json({ success: true, message: result.message || 'Login successful', redirect: '/home' });
    } else {
      return res.status(401).json({ success: false, message: (result && result.message) || 'Invalid username or password.' });
    }

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ success: false, error: error.message || String(error) });
  }
});


// ✅ Logout
router.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/'));
});

module.exports = router;
