// routes/apiroutes.js
const express = require('express');
const router = express.Router();
const apiCaller = require('../apicaller');
const { json } = require('body-parser');
const allowRoles = require('../routes/Middleware');
const { convertDate, errorlog } = require('../routes/Errorlog');

// POST /api/leads/save
router.post('/createusergrid', allowRoles(1), async (req, res) => {
  try {
    const UserId = req.session.AgntDtl.UserId
    // console.log("Raw body:", req.body);
    const data = req.body.data || [];
    // console.log("Parsed data array:", data);

    const [status] = data;
    // console.log("Extracted status:", status);

    const payload = { status, userid: UserId };
    // console.log("Payload before API:", payload);

    const result = await apiCaller.apicallerLivePort('Policy_renewal/userdetails', payload);
    // console.log("API Response:", result);

    const list3 = result?.BranchList || [];
    const list2 = result?.RoleList || [];

    const BranchList = [];
    const RoleList = [];

    // Process BranchList
    list3.forEach((x) => {
      const branchname = x?.branchname?.toString() || "";
      const id = x?.id ? parseInt(x.id) : null;

      const obj = {
        branchname: branchname, // Removed gl.Follow_ConvertDate, it’s not applicable for text
        id: id
      };

      BranchList.push(obj);
    });

    // Process RoleList
    list2.forEach((x) => {
      const rolename = x?.rolename?.toString() || "";
      const id = x?.id?.toString() || "";

      const obj = {
        rolename: rolename,
        id: id
      };

      RoleList.push(obj);
    });

    res.json({
      success: result.success,
      data: result?.UserList || [],
      BranchList: BranchList,
      Count: result.count,
      RoleList: RoleList
    });

  } catch (error) {
    console.error('❌ Error in /createusergrid:', error);
         errorlog(error, req);
    res.status(500).json({ success: false, error: error.message });
  }
});


router.post('/addnewuser', allowRoles(1), async (req, res) => {
  try {
    const UserId = req.session.AgntDtl.UserId
    // console.log("Raw body:", req.body);
    const data = req.body.data || [];
    // console.log("Parsed data array:", data);

    const [status] = data;
    // console.log("Extracted status:", status);

    const payload = { status, userid: UserId };
    // console.log("Payload before API:", payload);

    const result = await apiCaller.apicallerLivePort('Policy_renewal/userdetails', payload);
    // console.log("API Response:", result);

    const list3 = result?.BranchList || [];
    const list2 = result?.RoleList || [];

    const BranchList = [];
    const RoleList = [];

    // Process BranchList
    list3.forEach((x) => {
      const branchname = x?.branchname?.toString() || "";
      const id = x?.id ? parseInt(x.id) : null;

      const obj = {
        branchname: branchname, // Removed gl.Follow_ConvertDate, it’s not applicable for text
        id: id
      };

      BranchList.push(obj);
    });

    // Process RoleList
    list2.forEach((x) => {
      const rolename = x?.rolename?.toString() || "";
      const id = x?.id?.toString() || "";

      const obj = {
        rolename: rolename,
        id: id
      };

      RoleList.push(obj);
    });

    res.json({
      success: result.success,
      BranchList: BranchList,
      RoleList: RoleList,
      EmpCode: result?.EmpCode
    });

  } catch (error) {
    console.error('❌ Error in /createusergrid:', error);
         errorlog(error, req);
    res.status(500).json({ success: false, error: error.message });
  }
});






router.post('/Dataupdate', allowRoles(1), async (req, res) => {
  try {
    const data = req.body.data || [];
    // console.log("Parsed data array:", data);
    // If you need to map them properly
 const userid = {
      userid: data
    };
    const result = await apiCaller.apicallerLivePort('Policy_renewal/single_userdetails', userid);

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
  

router.post('/usercreation_Datainsert', allowRoles(1), async (req, res) => {
  try {
    const data = req.body.data || [];
    // console.log("Parsed data array:", data);
    // If you need to map them properly
       const [
      name, fatersname, fatheroccupation, dob, qualification, address,
      permanentaddress, mobile, altmobile1, esi, td, jointdate,
      accno, altmobile2, bloodgroup, emailid, username, password,
      branchid, roleid, salary, pf, deduction, bankname, ifsccode, statuss,userid,insertstatus
    ] = data;
    

    const userdetails = {
      name, fatersname, fatheroccupation, dob, qualification, address,
      permanentaddress, mobile, altmobile1, esi, td, jointdate,
      accno, altmobile2, bloodgroup, emailid, username, password,
      branchid, roleid, salary, pf, deduction, bankname, ifsccode, statuss,userid,insertstatus,createdid: "1"
    };

    console.log("User Details JSON:", JSON.stringify(userdetails));

    const result = await apiCaller.apicallerLivePort('Policy_renewal/user_insert', userdetails);

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
