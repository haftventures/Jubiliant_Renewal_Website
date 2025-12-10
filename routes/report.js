// routes/apiroutes.js
const express = require('express');
const router = express.Router();
const apiCaller = require('../apicaller');

// POST /api/leads/save
router.post('/reportgrid', async (req, res) => {
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

    const result = await apiCaller.apicallerLivePort('Policy_renewal/paymentreport', payload);

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
  
module.exports = router;
