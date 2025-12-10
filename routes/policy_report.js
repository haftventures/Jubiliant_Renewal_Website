const express = require('express');
const router = express.Router();
const apiCaller = require('../apicaller');
const axios = require('axios');

// POST /api/leads/save
router.post('/policy_reportpr_grid', async (req, res) => {
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
      data: result.data
    });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});


router.get('/policy_status', async (req, res) => {
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

    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
});

  
module.exports = router;
