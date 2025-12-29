// routes/policyprepare.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const apiCaller = require('../apicaller');
const allowRoles = require('../routes/Middleware');
const multer = require("multer");
const { convertDate, errorlog } = require('../routes/Errorlog');

// Store PDF in memory → buffer
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: { fileSize: 20 * 1024 * 1024 } 
});

// ✅ API to get all images for a given user and vehicle number
router.get('/get-images/:user/:vehicleno', allowRoles(1,2), (req, res) => {
  const { user, vehicleno } = req.params;
  const folderPath = path.join(__dirname, '../public/downloads/Gallery/policy/user','TN57AB1234');

  fs.readdir(folderPath, (err, files) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Error reading folder',
        error: err.message
      });
    }

    const imageFiles = files.filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file));
    const urls = imageFiles.map(file => `/downloads/Gallery/policy/user/TN57AB1234/${file}`);
    res.json({ success: true, images: urls });
  });
});

router.post('/policypreparegrid', allowRoles(1,2), async (req, res) => {
  try {
    // 🧠 Step 1: Prepare payload
    const UserId = req.session.AgntDtl.UserId
    const payload = { userid: UserId };
    // console.log("📤 Payload before API:", payload);

    // 🧠 Step 2: Call API
    const result = await apiCaller.apicallerLivePort('Policy_renewal/policy_prepare_list', payload);
    // console.log("📥 API Response:", result);

    // 🧠 Step 3: Send formatted response to client
    res.json({
      success: result?.success ?? false,
      fresh: result?.fresh || [],
      waiting: result?.waiting || [],
      BranchList: result?.waiting_count?.toString() || "0",
      RoleList: result?.fresh_count?.toString() || "0"
    });

  } catch (error) {
    console.error('❌ Error in /policypreparegrid:', error);
        errorlog(error, req);
    res.status(500).json({
      success: false,
      error: error.message || "Internal Server Error"
    });
  }
});

router.post('/prepareupdate',allowRoles(1,2), async (req, res) => {
  try {
    const data = req.body.data || [];
    // console.log("Parsed data array:", data);
    // If you need to map them properly
    const id = Number.parseInt(data, 10);

    const payload = { id: id };

    // // Example payload to API
    // const id = {
    //    id: Id
    // };

    const result = await apiCaller.apicallerLivePort('Policy_renewal/operation_policy_prepare', payload);

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

router.post("/preparesave", allowRoles(1,2), upload.single("pdfFile"), async (req, res) => {
  try {
    const UserId = req.session.AgntDtl.UserId;

    // get values sent from formData
    const data = req.body.data || [];
    const pdfFile = req.file;

    const [
      payment_datee, customername, mobile, vehicleno, make, model, idv, amount,
      transactionid, merchentorderid, regdate, chasisno, engineno, kycheader,
      pan, dob, support_header, support_description, od, tp, netpremium,
      grosspremium, company, policyno, ncb, policystartdate, policyenddate,
      remarks, policyid,difference_amount
    ] = data;

    // Create form-data for sending to internal API
    const FormData = require("form-data");
    const form = new FormData();

    // Append all text fields
    form.append("policyid", policyid);
    form.append("amount", amount);
    form.append("transactionid", transactionid);
    form.append("merchentorderid", merchentorderid);
    form.append("od", od);
    form.append("tp", tp);
    form.append("netpremium", netpremium);
    form.append("grosspremium", grosspremium);
    form.append("company", company);
    form.append("policyno", policyno);
    form.append("ncb", ncb);
    form.append("policystartdate", policystartdate);
    form.append("policyenddate", policyenddate);
    form.append("remarks", remarks);
    form.append("createby", UserId);
    form.append("mobile", mobile);
    form.append("difference_amount", difference_amount);
    // Append PDF file (binary)
    if (pdfFile) {
    form.append("pdfFile", pdfFile.buffer, {
        filename: pdfFile.originalname,
        contentType: pdfFile.mimetype
    });
}

console.log({
  policyid,
  amount,
  transactionid,
  merchentorderid,
  od,
  tp,
  netpremium,
  grosspremium,
  company,
  policyno,
  ncb,
  policystartdate,
  policyenddate,
  remarks,
  createby: UserId,
  mobile,
  difference_amount
});


const result = await apiCaller.apicallerLivePort_formdata(
    "Policy_renewal/operation_policy_save",
    form,
    {
        headers: form.getHeaders()  // MUST include this in Node.js
    }
);

 // -----------------------------------------------------------
    // 1️⃣ Save PDF locally (Gallery/Policy_pdf/policyid/policyid.pdf)
    // -----------------------------------------------------------

    // if (pdfFile) {
    //   const folderPath = path.join(__dirname, "..", "Gallery", "Policy_pdf", result.data.insertedId.toString());
    //   const filePath = path.join(folderPath, `${result.data.insertedId}.pdf`);

    //   // Create folder if it doesn't exist
    //   if (!fs.existsSync(folderPath)) {
    //     fs.mkdirSync(folderPath, { recursive: true });
    //   }

    //   // Save PDF
    //   fs.writeFileSync(filePath, pdfFile.buffer);
    // }

    return res.json({
      success: result.data.success,
      message: result.data.message,
      insertedId: result.data.insertedId,
    });

  } catch (error) {
    console.error("Error:", error);
        errorlog(error, req);
    return res.status(500).json({ success: false, error: error.message });
  }
});


router.post('/prepare_pending',allowRoles(1,2), async (req, res) => {
  try {
     const UserId = req.session.AgntDtl.UserId
    const data = req.body.data || [];
    // console.log("Parsed data array:", data);
    // If you need to map them properly
    const [id,policystatus] = data;

    // Example payload to API
      const savedata = {
        userid: UserId,
        policystatus: policystatus,
        id: id,
       
    };

    const result = await apiCaller.apicallerLivePort('Policy_renewal/policy_prepare_pending', savedata);

    // console.log("API Response:", result);

    res.json({
      success: result.success,
      message: result.message,
    });
  } catch (error) {
    console.error('Error:', error.message);
      errorlog(error, req);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/Get_companyname', allowRoles(1), async (req, res) => {
  try {
    const result = await apiCaller.apicallerGet('Policy_renewal/policy_company_list');

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




module.exports = router;
