const express = require('express');
const router = express.Router();
const apiCaller = require('../apicaller');
const axios = require('axios');
const allowRoles = require('../routes/Middleware');
const { convertDate, errorlog } = require('../routes/Errorlog');

router.get('/make_status_qc_verified', allowRoles(1,2), async (req, res) => {
  try {
    const UserId = req.session.AgntDtl.UserId;
    const userdetails = { userid: UserId };
    // const apiUrl = `Policy_renewal/getrenewaldata?txnid=${txnid}`;
    const result = await apiCaller.apicallerGet('Make/make_permission_list?userid=' + UserId);

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
router.post('/make_verify_details_qc_verified', allowRoles(1,2), async (req, res) => {
  try {
   
    const UserId = req.session.AgntDtl.UserId
    const data = req.body.data || [];

    const [status] = data;

    const payload = {
      userid: UserId,
      status: status
     
    };

    
    const result = await apiCaller.apicallerLivePort('make/make_verified_details', payload);
    
    if (!result || result.success === false) {
      return res.status(200).json({
        success: false,
        message: result?.message || 'No data found',
        data: []
      });
    }

     const rows = result.data || [];

    // 🔹 Extract countt (last record)
    let countt = 0;
    let tableData = rows;

    const lastRow = rows[rows.length - 1];
    if (lastRow && lastRow.countt !== undefined) {
      countt = lastRow.countt;
      tableData = rows.slice(0, -1); // remove count row
    }

    // ✅ Final response
    return res.status(200).json({
      success: true,
      message: 'Data fetched successfully',
      countt: countt,
      data: tableData
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
router.post('/make_verify_action_qc_verified', allowRoles(1,2), async (req, res) => {
  try {
    let { ids, status, insert_method } = req.body;
    req.body.data || [];
    const userid = req.session?.AgntDtl?.UserId;

    if (!ids || !status || !userid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid input data'
      });
    }

    // Ensure ids is array
    if (!Array.isArray(ids)) {
      ids = [ids];
    }

    // Convert status to number
    status = Number(status);

    const payload = {
      ids,        // [3]
      status,     // 1 | 2 | 3
      userid,
      insert_method,  // insert | update
      stage_position: 2  // stage details 2 for make QC verification
    };

    const result = await apiCaller.apicallerLivePort(
      'make/make_verified',
      payload
    );

    if (!result || result.success === false) {
      return res.status(200).json({
        success: false,
        message: result?.message || 'Action failed'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Status updated successfully'
    });

  } catch (error) {
    console.error('make_verify_action error:', error);
         errorlog(error, req);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});




module.exports = router;