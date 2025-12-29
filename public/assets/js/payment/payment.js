
$(document).ready(function () { 
   $(document).on('click', '#btn_sticky_renewal', btn_sticky_renewal);
    $(document).on('click', '#save_btn', save_btn);
      $(document).on('click', '#btn_sticky_Not_Interested', btn_sticky_Not_Interested);
    
         const urlParams = new URLSearchParams(window.location.search);
         const paymentid = urlParams.get('txnid');
         const excelid = urlParams.get('excelid');
        $('#lbltnxid').text(paymentid);
        $('#lblexcelid').text(excelid);

         document.getElementById('logo_id').addEventListener('click', function () {
    window.location.href = 'https://www.jubiliant.co.in/';
  });
});

  const checkedvalue = $('#oneYear').val();
   $('#txtgrosspremium').text(checkedvalue);
   $('#rn_am').text('₹' + checkedvalue);
   
  // Run after page loads
  document.addEventListener('DOMContentLoaded', function() {
    const radios = document.querySelectorAll('input[name="option"]');
    const lblGross = document.getElementById('txtgrosspremium');

    radios.forEach(radio => {
      radio.addEventListener('change', () => {
        // Get selected amount
        const selectedValue = radio.value;
        // Update hidden span with selected ₹ amount
        lblGross.textContent = selectedValue;
          $('#rn_am').text('₹' + selectedValue);
        console.log("💰 Selected Premium:", selectedValue);
      });
    });
  });


    // ✅ SHOW LOADER IMMEDIATELY
    document.addEventListener("DOMContentLoaded", function() {
      document.body.classList.add("loading");
      document.getElementById("loader").style.display = "flex";
    });

    // ✅ HIDE LOADER ONLY AFTER EVERYTHING (images, fonts, QR, etc.)
    window.addEventListener("load", function() {
      setTimeout(() => {
        $("#loader").fadeOut(800, function() {
          document.body.classList.remove("loading");
        });
      }, 1000);
    });

 const urlParams = new URLSearchParams(window.location.search);

// Get the value of ?paymentid=...
const paymentid = urlParams.get('txnid');

    // Payment details
   const receiverName = "Sanjai Hunter";
const receiverUpiId = "sanjaihunter2@okaxis";
const amount = $("#lbl_grosspremium").text();  // always 2 decimal digits
console.log(amount);
const tn = paymentid; 
console.log(paymentid);
const tid = Date.now();  // unique transaction ID
const tr = "txn" + Date.now();  // unique reference




// const upiUrl = `upi://pay?pa=${receiverUpiId}&pn=${encodeURIComponent(receiverName)}&am=${amount}&cu=INR&tid=${tid}&tr=${tr}&tn=${paymentid}`;
const upiUrl = `upi://pay?pa=${receiverUpiId}&pn=${encodeURIComponent(receiverName)}&am=${amount}&cu=INR&tn=${paymentid}`;

// Download QR button
const downloadBtn = document.getElementById('downloadBtn');
downloadBtn.addEventListener('click', () => {
  const canvas = document.getElementById('qrCanvas');
  const image = canvas.toDataURL('image/png');
  downloadBtn.href = image;
});

    // Generate QR on page load
    window.addEventListener("load", () => {
      const canvas = document.getElementById("qrCanvas");
      const canvasmob = document.getElementById("qrCanvasmob");
      QRCode.toCanvas(canvas, upiUrl, { width: 200 }, (error) => {
        if (error) console.error(error);
      });

      QRCode.toCanvas(canvasmob, upiUrl, { width: 200 }, (error) => {
        if (error) console.error(error);
      });

      // Mobile: open UPI link when GPay icon clicked
      const gpayIcon = document.getElementById("gpayIcon");
       const btn_sticky_renewal = document.getElementById("btn_sticky_renewal");
      if (gpayIcon) {
        gpayIcon.addEventListener("click", () => {
          window.location.href = upiUrl;
        });
      }

      // if (btn_sticky_renewal) {
      //   btn_sticky_renewal.addEventListener("click", () => {
      //     window.location.href = upiUrl;
      //   });
      // }

    });

  
     const paymentId = "<%= txnid %>";
    console.log("Payment ID from EJS:", paymentId);





function btn_sticky_renewal() {
 let checkbox = document.getElementById("terms_policy");
  if (!checkbox.checked) {
    showmobilenumber("Error!","Please agree to the terms and conditions.");
    return;
  }


  let data = [];
  let customername = $('#txtcustomername').text();
  data.push(customername);

  let mobile = $("#lblmobile").text();
  data.push(mobile);

  let transactionid = $("#lbtransactionid").text();
  data.push(transactionid);

  let id = $("#lblid").text();
  data.push(id);

  let amount = $("#txtgrosspremium").text();
  data.push(amount);

 const selectedOption = document.querySelector('input[name="option"]:checked');
  let durationLabel = selectedOption?.value; 
  // if (selectedOption.id == "oneYear") {
  //   durationLabel = document.getElementById("lbl1").innerText;
  // } else if (selectedOption.id == "twoYear") {
  //   durationLabel = document.getElementById("lbl2").innerText;
  // } else if (selectedOption.id == "threeYear") {
  //   durationLabel = document.getElementById("lbl3").innerText;
  // }
  data.push(durationLabel);

  $.ajax({
    type: "POST",
    traditional: true,
    beforeSend: function () {
      $("#cover").show();
    },
    data: { data: data },
    url: "/renewalsubmit",
    success: function (response) {
      $("#cover").hide();

      // ✅ Open redirect URL if present
      if (response?.data?.data?.redirectUrl) {
        window.location.href = response.data.data.redirectUrl;
      } else {
        alert(response?.data?.message || "Something went wrong");
      }
    },
    error: function (xhr, status, error) {
      $("#cover").hide();
      console.error("Error:", error);
    showmobilenumber("Error!", error);
    }
  });
}

  // Support button click event
  document.getElementById('support_btn').addEventListener('click', function() {
    document.getElementById('support_Modal').style.display = 'flex';
  });

  // Function to close the modal
  function closeModal() {
    document.getElementById('support_Modal').style.display = 'none';
  }


  
function save_btn() {
  const data = [
    $('#lbltnxid').text().trim(),
    $('#lblexcelid').text().trim(),
    $("#sp_name").val(),
    $("#sp_description").val()
  ];

  $.ajax({
    url: '/payment_support',
    type: 'POST',
    contentType: 'application/json', // ✅ send JSON properly
    data: JSON.stringify({ data: data }),
       beforeSend: function () {
            $("#cover").show();
        },
    success: function (response) {
      console.log('Server Response:', response);

      if (response.success == true) {
       showmobilenumber('Success!', response.message)
        $("#sp_name").val(""),
        $("#sp_description").val("")
       document.getElementById('support_Modal').style.display = 'none';
      } else  {
         showmobilenumber('Error!', response.message)
      }
    },
    error: function (error) {
      console.error('Error updating payment status:', error);
    }
  });
}


document.addEventListener('click', function (e) {
  const btn = e.target.closest('.toggleBtn');
  if (!btn) return;

  const index = btn.dataset.index;
  const text = document.getElementById(`vehicleText-${index}`);

  if (text.classList.contains('max-h-[1.1rem]')) {
    text.classList.remove('max-h-[1.1rem]');
    btn.querySelector('span').innerText = 'Less';
  } else {
    text.classList.add('max-h-[1.1rem]');
    btn.querySelector('span').innerText = 'More';
  }
});


function btn_sticky_Not_Interested () {
   const data = [
    $('#lbltnxid').text().trim(),
  ];

  $.ajax({
    url: '/not_interested',
    type: 'POST',
    contentType: 'application/json', // ✅ send JSON properly
    data: JSON.stringify({ data: data }),
       beforeSend: function () {
            $("#cover").show();
        },
    success: function (response) {
      console.log('Server Response:', response);

      if (response.success == true) {
       showmobilenumber('Success!', response.message)
      
      } else  {
         showmobilenumber('Error!', response.message)
      }
    },
    error: function (error) {
      console.error('Error:', error);
    }
  });
} 