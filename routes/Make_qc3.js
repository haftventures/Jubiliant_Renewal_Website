const express = require('express');
const router = express.Router();
const apiCaller = require('../apicaller');
const axios = require('axios');
const allowRoles = require('../routes/Middleware');
const { convertDate, errorlog } = require('../routes/Errorlog');

router.get('/Make_qc_verified3', allowRoles(1), async (req, res) => {
  try {
   
    const UserId = req.session.AgntDtl.UserId

   const result = await apiCaller.apicallerGet('make/Excel_Makeedit_details?userid=' + UserId);
    

     res.json({
      success: result.success,
      message: result.message,
      data: result.data,
      count: result.count 
    });

 

  } catch (error) {
    console.error('make_verify_details error:', error);
         errorlog(error, req);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});


router.post('/makeqc3_save', allowRoles(1), async (req, res) => {
  try {
       
    const UserId = req.session.AgntDtl.UserId
    const data = req.body.data || [];
    // console.log("Parsed data array:", data);
    // If you need to map them properly
       const [
      vehiclemake,  idv, oneyear, twoyear, threeyear, excelid,vehiclemakeid
     
    ] = data;
    

    const userdetails = {
    idv, oneyear, twoyear, threeyear, excelid, vehiclemakeid, userid: UserId

    };

    console.log("User Details JSON:", JSON.stringify(userdetails));

    const result = await apiCaller.apicallerLivePort('make/make_save', userdetails);

    // console.log("API Response:", result);

    res.json({
      success: result.success,
      message: result.message,
      data: result.results
    });
  } catch (error) {
    console.error('Error:', error.message);
         errorlog(error, req);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/makeqc3_search', async (req, res) => {
  try {
    const { make = '', companyid = 7 } = req.body;

    if (!make) return res.json({ success: true, result: [] });

    const usersearch = { make, companyid };

    const result = await apiCaller.apicallerLivePort(
      'make/make_search',
      usersearch
    );

    const data = result?.result || [];

    const filteredResults = data.filter(item =>
      item?.makedescrip?.toLowerCase().includes(make.toLowerCase())
    );

    res.json({ success: true, result: filteredResults });

  } catch (error) {
    console.error(error);
         errorlog(error, req);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.post('/makeqc3_delete', allowRoles(1), async (req, res) => {
  try {
       
    const UserId = req.session.AgntDtl.UserId
    const data = req.body.data || [];
    // console.log("Parsed data array:", data);
    // If you need to map them properly
       const [
      excelid
     
    ] = data;
    

    const userdetails = {
    excelid,userid: UserId

    };

    console.log("User Details JSON:", JSON.stringify(userdetails));

    const result = await apiCaller.apicallerLivePort('make/make_delete', userdetails);

    // console.log("API Response:", result);

    res.json({
      success: result.success,
      message: result.message,
      data: result.results
    });
  } catch (error) {
    console.error('Error:', error.message);
         errorlog(error, req);
    res.status(500).json({ success: false, error: error.message });
  }
});



module.exports = router;