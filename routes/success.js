// routes/apiroutes.js
const express = require('express');
const router = express.Router();
const apiCaller = require('../apicaller');
const axios = require('axios');


router.post('/successtxnidupdate', async (req, res) => {
  try {
    const data = req.body.data || [];
    // console.log('Received data:', data);

    const [txnid, excelid, merchantOrderId] = data;
    const userdetails = { txnid, excelid , merchantOrderId };

    const result = await apiCaller.apicallerLivePort(
      'Policy_renewal/payment_success_redirect',
      userdetails
    );

    res.json({ success: result.success });
  } catch (err) {
    console.error('successtxnidupdate error:', err);
    res.status(500).json({
      success: false,
      message: `Internal server error: ${err.message}`,
    });
  }
});

router.post('/Succcess_support', async (req, res) => {
  try {
    const data = req.body.data || [];
    // console.log('Received data:', data);

    const [txnid, excelid, name ,description] = data;
    const userdetails = { txnid, excelid, name , description};

    const result = await apiCaller.apicallerLivePort(
      'renewal/support_process',
      userdetails
    );

    res.json({ success: result.success, message: result.message });
  } catch (err) {
    console.error('successtxnidupdate error:', err);
    res.status(500).json({
      success: false,
      message: `Internal server error: ${err.message}`,
    });
  }
});


module.exports = router;
