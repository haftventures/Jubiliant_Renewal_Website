const express = require('express');
const router = express.Router();
const apiCaller = require('../apicaller');
const axios = require('axios');
const allowRoles = require('../routes/Middleware');
const { convertDate, errorlog } = require('../routes/Errorlog');

// POST /api/leads/save
router.post('/policy_reportpr_grid', allowRoles(1), async (req, res) => {
  try {
    const data = req.body.data || [];
    // console.log("Parsed data array:", data);
    // If you need to map them properly
    const [fromdate, todate, status] = data;

    // Example payload to API
    const payload = {
      fromdate: fromdate, 
      todate: todate,        
      status: status,
    };

    const result = await apiCaller.apicallerLivePort('Policy_renewal/policy_report', payload);

    // console.log("API Response:", result);

    res.json({
      success: result.success,
      message: "Data fetched successfully",
      data: result.data,
      Count:result.count
    });
  } catch (error) {
    console.error('Error:', error.message);
         errorlog(error, req);
    res.status(500).json({ success: false, error: error.message });
  }
});


router.get('/policy_status', allowRoles(1), async (req, res) => {
  try {
    const result = await apiCaller.apicallerGet('Policy_renewal/policy_status');

    return res.json({
      success: result.success,
      message: result.message,
      count: result.count,
      data: result.data
    });

  } catch (error) {
    console.error('Error:', error.message);
         errorlog(error, req);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
});


router.post('/policy_done_excel', allowRoles(1), async (req, res) => {
  try {
    const UserId = req.session.AgntDtl.UserId
    const data = req.body.data || [];
    // console.log("Parsed data array:", data);
    // If you need to map them properly
    const [fromdate, todate,status] = data;

    // Example payload to API
    const payload = {
      userid:UserId,
      status: status,
      fromdate: fromdate, 
      todate: todate       
      
    };

    const result = await apiCaller.apicallerLivePort('renewal/report_policy_done_excel', payload);

    // console.log("API Response:", result);

    res.json({
      success: result.success,
      message: "Data fetched successfully",
      data: result.data
    });
  } catch (error) {
    console.error('Error:', error.message);
         errorlog(error, req);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/report_policy_done_excel', allowRoles(1), async (req, res) => {
  try {
      const UserId = req.session.AgntDtl.UserId
    const data = req.body.data || [];
  
    const [fromdate, todate, status] = data;

    // Example payload to API
    const payload = {
      fromdate: fromdate, 
      todate: todate,        
      status: status,
      userid: UserId,
    };

    const result = await apiCaller.apicallerLivePort('renewal/report_policy_done_excel', payload);

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
