// routes/auth.js
const express = require('express');
const router = express.Router();
const apiCaller = require('../apicaller');
const axios = require('axios');
const { convertDate, errorlog } = require('../routes/Errorlog');
// ✅ Login page
router.get('/', (req, res) => {
  res.render('login', { layout: false, error: req.query.error || null });
});

// ✅ Login API
// router.post('/login', async (req, res) => {
//   try {
//     const { Name, Password } = req.body || {};
//     if (!Name || !Password) {
//       return res.status(400).json({ success: false, message: 'Missing credentials' });
//     }

//     const payload = { username: Name, password: Password };

//     if (typeof apiCaller === 'undefined' || !apiCaller.apicallerLivePort) {
//       throw new Error('apiCaller.apicallerLivePort is not available. Make sure apiCaller is required/imported.');
//     }

//     const result = await apiCaller.apicallerLivePort('Policy_renewal/login_website', payload);


//     if (result && result.success === true) {
//       // store session details (adjust fields to match API response)
//       req.session.AgntDtl = {
//         Roleid: result.roleid ,

//         Agentname: result.name ,
      
//         UserId: result.userid ,
      
//         branchid: result.branchid ,
    
//       };

//       return res.json({ success: true, message: result.message || 'Login successful', redirect: '/home' });
//     } else {
//       return res.status(401).json({ success: false, message: (result && result.message) || 'Invalid username or password.' });
//     }

//   } catch (error) {
//     console.error('Error:', error);
//     return res.status(500).json({ success: false, error: error.message || String(error) });
//   }
// });

router.post('/login', async (req, res) => {
  try {
    const { Name, Password } = req.body || {};

    if (!Name || !Password) {
      return res.status(400).json({ success: false, message: 'Missing credentials' });
    } 

    const payload = { username: Name, password: Password };
    const result = await apiCaller.apicallerLivePort('Policy_renewal/login_website', payload);

    if (result && result.success === true) {

      // 🔥 IMPORTANT: Regenerate new session for security
      req.session.regenerate(err => {
        if (err) return res.status(500).json({ success: false, message: "Session error" });

        // Store login flag
        req.session.login = true;

        // Store session user data
        req.session.AgntDtl = {
          Roleid: result.roleid,
          Agentname: result.name,
          UserId: result.userid,
          branchid: result.branchid,
        };

        req.session.save(() => {
          return res.json({ 
            success: true, 
            message: result.message || 'Login successful', 
            redirect: '/home' 
          });
        });
      });

    } else {
      return res.status(401).json({ success: false, message: result?.message || 'Invalid username or password.' });
    }

  } catch (error) {
    console.error("Login Error:", error);
            errorlog(error, req);
    return res.status(500).json({ success: false, error: error.message });
  }
});








// ✅ Logout
// router.get('/logout', (req, res) => {
//   req.session.destroy(() => res.redirect('/'));
// });


router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid"); // important
    res.redirect('/login');         // redirect to login page
  });
});

module.exports = router;
