const express = require('express');
const router = express.Router();
const apiCaller = require('../apicaller');
const allowRoles = require('../routes/Middleware');
const { convertDate, errorlog } = require('../routes/Errorlog');


router.post('/show_policy_count', allowRoles(1), async (req, res) => {
  try {
        const UserId = req.session.AgntDtl.UserId
    const data = req.body.data || [];
    // console.log("Parsed data array:", data);
    // If you need to map them properly
    const [fromdate, todate] = data;

    // Example payload to API
    const payload = {
      fromdate: fromdate, 
      todate: todate,        
      userid: UserId,
    };

    const result = await apiCaller.apicallerLivePort('renewal/show_policy_count', payload);

    // console.log("API Response:", result);
     const count = result?.data?.[0]?.countt ?? 0;

    if (count > 0) {
      // ✔ Count available
      return res.json({
        success: true,
        message: "Data Count fetched successfully",
        count: count,
        data: result.data
      });
    } else {
      // ❌ No records
      return res.json({
        success: false,
        message: "No eligible policies found",
        count: 0,
        data: []
      });
    }
  } catch (error) {
    console.error('Error:', error.message);
         errorlog(error, req);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/mass_sms_ids', allowRoles(1), async (req, res) => {
    try {
        
         const data = req.body.data || [];
    // console.log("Parsed data array:", data);
    // If you need to map them properly
    const [fromdate, todate] = data;

    // Example payload to API
    const payload = {
      fromdate: fromdate, 
      todate: todate,        
      userid: UserId,
    };
    const result = await apiCaller.apicallerLivePort('renewal/massive_update_ids', payload);

        const response = result?.[0] || result;

        if (response?.success == true && response?.inserted > 0) {
            res.json({
                success: true,
                message: "SMS sent successfully to selected IDs",
                inserted: response.inserted || 0
            });
        }
        else if (response?.success == true && response?.inserted == 0){
          res.json({
                success: true,
                message: "SMS Already sent to selected IDs",
                inserted: response.inserted || 0
            });
          }
         else {
            res.json({
                success: false,
                message: "Failed to send SMS to selected IDs",
                inserted: 0
            });
          }

    } catch (error) {
        console.error('Error:', error.message);
             errorlog(error, req);
        res.status(500).json({ success: false, error: error.message });
    }
});


  
module.exports = router;