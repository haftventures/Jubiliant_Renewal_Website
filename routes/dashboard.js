const express = require('express');
const router = express.Router();
const apiCaller = require('../apicaller');

router.post("/dashboard_list", async (req, res) => {
    try {
        const UserId = req.session.AgntDtl.UserId
        const { month, year } = req.body;

        if (!month || !year) {
            return res.json({
                success: false,
                message: "Month and Year required"
            });
        }
        const payload = { month: month,year:year, userid: UserId };         
        const result = await apiCaller.apicallerLivePort('renewal/dashboard_list', payload);       
        const response = result?.[0] || result;

         const today = response.data.today;
         const monthData = response.data.month;

        res.json({
            success: result.success,
            message: result.message,
            today: today,
            monthData: monthData 
        });
    }
     catch (err) {
        console.error("Error:", err.message);
        res.json({
            success: false,
            message: "Error loading dashboard",
            error: err.message
        });
    }
});

module.exports = router;
