// routes/apiroutes.js
const express = require('express');
const router = express.Router();
const apiCaller = require('../apicaller');
const axios = require('axios');
const { convertDate, errorlog } = require('../routes/Errorlog');
// async function paymentHandler(req, res) {
//   try {
//     // console.log("=% blazepaymentHandler HIT");

//     const txnid = req.query.txnid;
//     if (!txnid) {
//       return res.status(400).send("Missing payment ID");
//     }

//     //  Call API and get data
//     const apiUrl = `Policy_renewal/getrenewaldata?txnid=${txnid}`;
//     const result = await apiCaller.apicallerGet(apiUrl);
//     const message = String(result.success).toLowerCase(); 
//     //  Make sure renewalData is an array
//     const list2 = Array.isArray(result.renewalData)
//       ? result.renewalData
//       : result.renewalData
//       ? [result.renewalData]
//       : [];
//    if (message == "true") {
//     //  Get the first renewal object
//     const renewal = list2[0];



//     //  Convert PremiumDurations string to JSON
//     const PremiumDurations = JSON.parse(renewal.PremiumDurations);

//     //  Extract premium values
//     const oneYear = PremiumDurations["1"];
//     const twoYear = PremiumDurations["2"];
//     const threeYear = PremiumDurations["3"];

//     //  Prepare data for page
//     const followupListData = [
//       {
//         customername: renewal.customername || "",
//         mobile: renewal.mobile || "",
//         vehicleno: renewal.vehicleno || "",
//         make: renewal.make || "",
//         model: renewal.model || "",
//         year: renewal.year || "",
//         idv: renewal.idv || "",
//         cc: renewal.cc || "",
//         grosspremium: renewal.grosspremium || "",
//         prev_policyno: renewal.prev_policyno || "",
//         id: renewal.id || "",
//         transactionid: renewal.transactionid || "",
//         mobile: renewal.mobile || "",
//         email: renewal.email || "",
//         policyenddate: renewal.policyenddate || "",
//       },
//     ];

//     //  Render EJS page with all data
//     // res.render("payment", { txnid, followupListData, oneYear, twoYear, threeYear });
   
//     res.render("payment", { layout: false, txnid, followupListData, oneYear, twoYear, threeYear });
// } else if (message == "false") {

//    res.redirect("/paymentdone.html");
// }
//   } catch (err) {
//     console.error("L Error in blazepaymentHandler:", err);
//     res.status(500).send("Internal Server Error");
//   }
// }


async function paymentHandler(req, res) {
  try {
    // console.log("=% blazepaymentHandler HIT");

    const txnid = req.query.txnid;
    if (!txnid) {
      return res.status(400).send("Missing payment ID");
    }

    //  Call API and get data
    const apiUrl = `Policy_renewal/getrenewaldata?txnid=${txnid}`;
    const result = await apiCaller.apicallerGet(apiUrl);
    const message = String(result.success).toLowerCase(); 
    //  Make sure renewalData is an array
    const list2 = Array.isArray(result.renewalData)
      ? result.renewalData
      : result.renewalData
      ? [result.renewalData]
      : [];
   if (message == "true") {
    //  Get the first renewal object
    const renewal = list2[0];



    //  Convert PremiumDurations string to JSON
    const PremiumDurations = JSON.parse(renewal.PremiumDurations);

    //  Extract premium values
    const oneYear = PremiumDurations["1"];
    const twoYear = PremiumDurations["2"];
    const threeYear = PremiumDurations["3"];

    //  Prepare data for page
    const followupListData = [
      {
        customername: renewal.customername || "",
        mobile: renewal.mobile || "",
        vehicleno: renewal.vehicleno || "",
        make: renewal.make || "",
        model: renewal.model || "",
        year: renewal.year || "",
        idv: renewal.idv || "",
        cc: renewal.cc || "",
        grosspremium: renewal.grosspremium || "",
        prev_policyno: renewal.prev_policyno || "",
        id: renewal.id || "",
        transactionid: renewal.transactionid || "",
        mobile: renewal.mobile || "",
        email: renewal.email || "",
        policyenddate: renewal.policyenddate || "",
        engineno: renewal.engineno || "",
        chasisno: renewal.chasisno || "",
      },
    ];

    //  Render EJS page with all data
    // res.render("payment", { txnid, followupListData, oneYear, twoYear, threeYear });
   
    res.render("payment", { layout: false, txnid, followupListData, oneYear, twoYear, threeYear });
     
    // return res.redirect("/underconstruction.html");
} else if (message == "false") {
   const renewal = list2[0];
   res.redirect(`/paymentdone.html?txnid=${encodeURIComponent(txnid)}&excelid=${encodeURIComponent(renewal.id)}`);
}
  } catch (error) {
    console.error("L Error in paymentHandler:", error);
    // res.status(500).send("Internal Server Error");
    errorlog(error, req);
     res.redirect(`/linkexpired.html`);
  }
}



router.post('/renewalsubmit', async (req, res) => {
  try {
    // console.log("=� /renewalsubmit HIT");
    // console.log("Incoming body:", req.body);

    // Youre currently sending 'data' array from frontend,
    // so unpack it properly or adjust as needed
    const data = req.body.data || [];
    // console.log("Parsed data array:", data);

    // If you need to map them properly
    const [customername, transactionid, mobile,  id, amount, year] = data;

    // Example payload to API
    const payload = {
      customername: customername, 
      mobile: mobile,        
      id: id,              
      amount: amount,
      transactionid: transactionid,
      year: year,
    };

    const result = await apiCaller.apicallerLivePort(
      'Policy_renewal/paymentlink_duration_based',
      payload
    );

    // console.log("API result:", result);

    //  Return whole result
    return res.json({ data: result });

  } catch (error) {
    console.error('save_reports error:', error);
    errorlog(error, req);
    return res.status(500).json({
      status: 500,
      message: `Internal server error: ${error.message}`
    });
  }
});


router.post('/payment_support', async (req, res) => {
  try {
    // console.log("=� /renewalsubmit HIT");
    // console.log("Incoming body:", req.body);

    // Youre currently sending 'data' array from frontend,
    // so unpack it properly or adjust as needed
    const data = req.body.data || [];
    // console.log("Parsed data array:", data);

    // If you need to map them properly
    const [txnid, excelid, name,  description] = data;

    // Example payload to API
    const payload = {
      txnid: txnid, 
      excelid: excelid,        
      name: name,              
      description: description,
    };

    const result = await apiCaller.apicallerLivePort(
      'renewal/support_process',
      payload
    );

    // console.log("API result:", result);

    //  Return whole result
    return res.json({ success: result.success, message: result.message, insertedid: result.insertedid });

  } catch (error) {
    console.error('save_reports error:', error);
    errorlog(error, req);
    return res.status(500).json({
      status: 500,
      message: `Internal server error: ${error.message}`
    });
  }
});



router.post('/not_interested', async (req, res) => {
  try {
  
    const data = req.body.data || [];
   
    const [txnid] = data;

    const payload = {
      txnid: txnid, 
    };

    const result = await apiCaller.apicallerLivePort(
      'Policy_renewal/not_interested',
      payload
    );

    return res.json({ success: result.success, message: result.message});

  } catch (error) {
    console.error('save_reports error:', error);
    errorlog(error, req);
    return res.status(500).json({
      status: 500,
      message: `Internal server error: ${error.message}`
    });
  }
});




module.exports = paymentHandler;


// Register the route
router.get('/payment', paymentHandler);

module.exports = router;
