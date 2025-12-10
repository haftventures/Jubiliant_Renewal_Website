const express = require('express');
const router = express.Router();
const apiCaller = require('../apicaller');

router.post('/policydetailgrid_hari', async (req, res) => {
  try {
    const data = req.body.data || [];
    // console.log("Parsed data array:", data);
    // If you need to map them properly
    const [fromdate, todate, userid] = data;

    // Example payload to API
    const payload = {
      fromdate: fromdate, 
      todate: todate,        
      userid: userid,
    };

    const result = await apiCaller.apicallerLivePort('renewal/get_upload_data_list', payload);

    // console.log("API Response:", result);

    res.json({
      success: result.success,
      message: "Data fetched successfully",
      data: result.data,
      Count:result.count
    });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/selected_ids', async (req, res) => {
    try {
            const UserId = req.session.AgntDtl.UserId
        const data = req.body.data || []; // Example: [1,2,3,4,5]

        if (!Array.isArray(data) || data.length === 0) {
            return res.status(400).json({ success: false, message: "No IDs provided" });
        }
        const payload = { ids: data, userid: UserId };

        // Send the array directly
        const result = await apiCaller.apicallerLivePort('renewal/selected_sms_ids', payload);

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
        res.status(500).json({ success: false, error: error.message });
    }
});
// router.get("/mass-update", (req, res) => {
//     res.render("mass_update_sms");
// });


module.exports = router;