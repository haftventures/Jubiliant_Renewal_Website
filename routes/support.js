// routes/apiroutes.js
const express = require('express');
const router = express.Router();
const apiCaller = require('../apicaller');
const allowRoles = require('../routes/Middleware');
const { convertDate, errorlog } = require('../routes/Errorlog');

// POST /api/leads/save
router.post('/support_report', allowRoles(1), async (req, res) => {
  try {
    const UserId = req.session.AgntDtl.UserId
    const data = req.body.data || [];
    // console.log("Parsed data array:", data);
    // If you need to map them properly
    const [fromdate, todate, status] = data;

    // Example payload to API
    const payload = {
      fromdate: fromdate, 
      todate: todate,        
      userid: UserId,
    };

    const result = await apiCaller.apicallerLivePort('renewal/support_report', payload);

    // console.log("API Response:", result);

    res.json({
      success: result.success,
      message: result.message,
      Count: result.count,
      data: result.data
    });
  } catch (error) {
    console.error('Error:', error.message);
         errorlog(error, req);
    res.status(500).json({ success: false, error: error.message });
  }
});
  

router.post('/support_report_view', allowRoles(1), async (req, res) => {
  try {
    const UserId = req.session.AgntDtl.UserId
     const transactionid = req.body.id;

    const payload = { transactionid };
    
    const result = await apiCaller.apicallerLivePort('renewal/support_reply_view', payload);

    // console.log("API Response:", result);

    res.json({
      success: result.success,
      message: result.message,
      data: result.data
    });
  } catch (error) {
    console.error('Error:', error.message);
         errorlog(error, req);
    res.status(500).json({ success: false, error: error.message });
  }
});


router.post('/support_report_save', allowRoles(1), async (req, res) => {
  try {
    const UserId = req.session.AgntDtl.UserId
     const transactionid = req.body.data;

   const [supportid,  mobileno, message] = transactionid;

   const payload = { supportid, message, mobileno, createby: UserId };
    
    const result = await apiCaller.apicallerLivePort('renewal/support_reply', payload);

    // console.log("API Response:", result);

    res.json({
      success: result.success,
      message: result.message,
      data: result.data
    });
  } catch (error) {
    console.error('Error:', error.message);
         errorlog(error, req);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
