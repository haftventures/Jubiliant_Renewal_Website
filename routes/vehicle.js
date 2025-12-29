// routes/apiroutes.js
const express = require('express');
const router = express.Router();
const apiCaller = require('../apicaller');
const allowRoles = require('../routes/Middleware');
const { convertDate, errorlog } = require('../routes/Errorlog');

// POST /api/leads/save
router.post('/vehiclegrid', allowRoles(1), async (req, res) => {
  try {
    const data = req.body.data || [];
    // console.log("Parsed data array:", data);
    // If you need to map them properly
    const [fromdate, todate] = data;

    // Example payload to API
    const payload = {
      fromdate: fromdate, 
      todate: todate,        
      
    };

    const result = await apiCaller.apicallerLivePort('Policy_renewal/renewalList', payload);

    // console.log("API Response:", result);

    res.json({
      success: true,
      message: "Data fetched successfully",
      data: result.data
    });
  } catch (error) {
    console.error('Error:', error.message);
         errorlog(error, req);
    res.status(500).json({ success: false, error: error.message });
  }
});


router.post('/Datasave', allowRoles(1), async (req, res) => {
  try {
    const data = req.body.data || [];
    const UserId = req.session.AgntDtl.UserId
    // console.log("Parsed data array:", data);
    // If you need to map them properly
    const [transaction_id,upi_id,upi_name,amount,payment_date,policyid] = data;

    // Example payload to API
    const payload = {
       transaction_id: transaction_id, 
       upi_id: upi_id,        
       upi_name: upi_name,
       amount: amount,
       payment_date: payment_date,
       policyid: policyid,
       payment_status: "Success",
       createby: UserId,
    };

    const result = await apiCaller.apicallerLivePort('Policy_renewal/paymentsuccess', payload);

    // console.log("API Response:", result);

    res.json({
      success: result.success,
      message: result.message,
      data: result.inserted_id
    });
  } catch (error) {
    console.error('Error:', error.message);
         errorlog(error, req);
    res.status(500).json({ success: false, error: error.message });
  }
});
  
  
module.exports = router;
