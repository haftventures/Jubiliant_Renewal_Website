$(document).ready(function () {
 $(document).on('click', '#viewBtn_pr', () => checkSession(viewBtn_pr));
 $(document).on('click', '#btn_policy_done_excel', btn_policy_done_excel);
  load();


  const statusSelect = document.getElementById("status_pr");
   const excelBtn = document.getElementById("ex_excel");

  statusSelect.addEventListener("change", function () {
    if (this.value === "7") {
      // excelBtn.remove();
      $("#btn_policy_done_excel").removeClass("hidden");
    } else {
      // excelBtn.add(); 
        $("#btn_policy_done_excel").addClass("hidden");
    }
  });

  //   document.addEventListener('keydown', function (e) {
  //   if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
  //     closeModal();
  //   }
  // });

function formatDate(date) {
  const d = String(date.getDate()).padStart(2, '0');
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const y = date.getFullYear();
  return `${d}/${m}/${y}`;
}

  $("#FromDate_pr").val(formatDate(firstDayOfMonth));
  $("#ToDate_pr").val(formatDate(today));

   
});



var today = new Date();
var twoYearsAgo = new Date();
twoYearsAgo.setFullYear(today.getFullYear() - 2);
var firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

 flatpickr("#FromDate_pr", {
      dateFormat: "d/m/Y",
      minDate: twoYearsAgo,
      maxDate: today,
      allowInput: false,
       disableMobile: true, 
      onReady: function(_, __, fp) {
          const yWrap = fp.calendarContainer.querySelector(".numInputWrapper");
          if (yWrap) yWrap.style.display = "none";
          const sel = document.createElement("select");
          sel.className = "fp-year";
          const curY = new Date().getFullYear();

          for (let y = curY - 2; y <= curY; y++) {
              const opt = document.createElement("option");
              opt.value = y;
              opt.textContent = y;
              sel.appendChild(opt);
          }

          sel.value = fp.currentYear;
          sel.onchange = () => fp.jumpToDate(new Date(sel.value, fp.currentMonth, 1));

          fp.calendarContainer.querySelector(".flatpickr-current-month").append(sel);
          fp.calendarContainer.addEventListener("click", () => {
              sel.value = fp.currentYear;
          });
      }
  });


flatpickr("#ToDate_pr", {
      dateFormat: "d/m/Y",
      minDate: twoYearsAgo,
      maxDate: today,
      allowInput: false,
       disableMobile: true, 
      onReady: function(_, __, fp) {
          const yWrap = fp.calendarContainer.querySelector(".numInputWrapper");
          if (yWrap) yWrap.style.display = "none";
          const sel = document.createElement("select");
          sel.className = "fp-year";
          const curY = new Date().getFullYear();

          for (let y = curY - 2; y <= curY; y++) {
              const opt = document.createElement("option");
              opt.value = y;
              opt.textContent = y;
              sel.appendChild(opt);
          }

          sel.value = fp.currentYear;
          sel.onchange = () => fp.jumpToDate(new Date(sel.value, fp.currentMonth, 1));

          fp.calendarContainer.querySelector(".flatpickr-current-month").append(sel);
          fp.calendarContainer.addEventListener("click", () => {
              sel.value = fp.currentYear;
          });
      }
  });

function viewBtn_pr() {

  if (chkdata(".status_pr")) {

    const data = [
      $('#FromDate_pr').val(),
      $('#ToDate_pr').val(),
      $('#status_pr').val().toLowerCase()
    ];

    $.ajax({
      type: "POST",
      url: "/policy_reportpr_grid",
      traditional: true,
      data: { data: data },
      beforeSend: function () {
        $("#cover").show();
      },
      success: function (response) {
        $("#P_rgrid").removeClass("hidden");
        $("#cover").hide();

        let success = response.success;

        if (success == true) {
             $("#lbltotal_count").text(response.Count);
          if (window.currentTabulator) {
            window.currentTabulator.destroy();
          }

          let status = $('#status_pr').val();

              //  if (status == "7") {
              //   $("#excel_btn").removeClass("hidden");
              //  } else {
              //    $("#excel_btn").addClass("hidden");
              //    }

          window.currentTabulator = createThemedGrid(
            "#dynamicTable_pr",
            response.data,
            [
              { title: "S.No.", formatter: "rownum", widthGrow: 1, hozAlign: "center" },
              { title: "Date", field: "date", widthGrow: 1 },
              { title: "Customer Name", field: "customername", widthGrow: 2 },
              { title: "Mobile", field: "mobile", widthGrow: 1 },
              { title: "Vehicle No", field: "vehicleno", widthGrow: 2 },
              { title: "Make", field: "make", widthGrow: 1 },
              { title: "Model", field: "model", widthGrow: 1 },
              { title: "Cc", field: "cc", widthGrow: 1 },
              { title: "Engineno", field: "engineno", widthGrow: 2 },
              { title: "Chasisno", field: "chasisno", widthGrow: 2 },
              { title: "Transactionid", field: "transactionid", widthGrow: 2, hozAlign: "right", visible: false },

              ...(status == "7" ? [{
                title: "Action",
                widthGrow: 1,
                formatter: function (cell) {
                  const userid = cell.getRow().getData().userid;
                  return `<u style="color:blue; cursor:pointer;" onclick="policy_report_view(${userid})">View</u>`;
                }
              }] : [])
            ]
          );

          // ✅ REMOVE EXCEL BUTTON (NO CHANGE TO createThemedGrid)

   const excelBtn = document.getElementById("ex_excel");

if (status == "7") {
      excelBtn.remove();
    } else {
     excelBtn.add();
    }
        } 
      
        else {
          $("#dynamicTable_pr").html(
            '<p class="text-center text-red-600 py-4">No data found</p>'
          );
        }
      },
      error: function (xhr, status, error) {
        $("#cover").hide();
        console.error("Error:", error);
        showmobilenumber("Error!", error);
      }
    });
  }
}

function load() {
  $.ajax({
    type: "GET",
    url: "/policy_status",
    traditional: true,
    beforeSend: function () {
      $("#cover").show();
    },
    success: function (response) {

      const success = response.success;
      const data = response.data;

      $("#cover").hide();

      if (success === true) {
        

        const select = document.getElementById('status_pr');
        let options = '';
        const option = '<option value="0">-- Select --</option>';

        // FIXED: use data.forEach, not select.data
        data.forEach(element => {
          options += `<option value="${element.id}">${element.policy_status}</option>`;
        });

        select.innerHTML = option + options;
      }
    },
    error: function (xhr, status, error) {
      $("#cover").hide();
      console.error("Error:", error);
    }
  });
}

// async function checkSession(callback) {
//     const response = await fetch("/check-session", {
//         credentials: "include" // 🔥 IMPORTANT
//     });

//     const data = await response.json();

//     if (!data.active) {
//         window.location.href = "/logout";
//         return;
//     }

//     callback();
// }



function btn_policy_done_excel() {

  if (chkdata(".status_pr")) {

    const data = [
      $('#FromDate_pr').val(),
      $('#ToDate_pr').val(),
      $('#status_pr').val().toLowerCase()
    ];

    $.ajax({
      type: "POST",
      url: "/policy_done_excel",
      traditional: true,
      data: { data: data },
      beforeSend: function () {
        $("#cover").show();
      },
      success: function (response) {
       $("#cover").hide();
        if (response.success && response.data && response.data.length > 0) {
          downloadExcel(response.data);
        } else {
          alert("No data available for export");
        }
      }
    })
  }
}
function downloadExcel(jsonData) {

  // Convert JSON to worksheet
  const worksheet = XLSX.utils.json_to_sheet(jsonData);

  // Create workbook
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Policy Report");

  // File name with date
  const fileName = `Policy_Done_Report_${new Date().toISOString().slice(0,10)}.xlsx`;

  // Download
  XLSX.writeFile(workbook, fileName);
}




function policy_report_view() {

    const data = [
      $('#FromDate_pr').val(),
      $('#ToDate_pr').val(),
      $('#status_pr').val(),
    ];




  $.ajax({
    type: "POST",
    url: "/report_policy_done_excel",
    traditional: true,
    data: { data: data },
    beforeSend: function () {
      $("#cover").show();
    },
    success: function (response) {
      console.log("Response:", response);
      $("#cover").hide();
      const user = response.data[0]; 
        document.getElementById('policyModal').style.display = 'flex';
        $("#transactionid").text(user.transactionid || "");
        $("#payment_time").text(user.payment_time || "");
        $("#policy_close_time").text(user.policy_close_time || "");
        $("#Payment_amount").text(user.Payment_amount || "");
        $("#different_amount").text(user.different_amount || "");
        $("#grosspremium").text(user.grosspremium || "");
        $("#netpremium").text(user.netpremium || "");
        $("#company").text(user.company || "");
        $("#Kyc_name").text(user.Kyc_name || "");
        $("#KYC_pan").text(user.KYC_pan || "");
        $("#KYC_dob").text(user.KYC_dob || "");
        $("#kyc_update_time").text(user.kyc_update_time || "");
        $("#support_update_time").text(user.support_update_time || "");
        $("#customername").text(user.customername || "");
        $("#mobile").text(user.mobile || "");
        $("#vehicleno").text(user.vehicleno || "");
        $("#make").text(user.make || "");
        $("#model").text(user.model || "");
        $("#engineno").text(user.engineno || "");
        $("#chasisno").text(user.chasisno || "");
        $("#od").text(user.od || "");
        $("#tp").text(user.tp || "");
        $("#gst").text(user.gst || "");
        $("#policy_start_date").text(user.policy_start_date || "");
        $("#policy_end_date").text(user.policy_end_date || "");
        $("#policyno").text(user.policyno || "");
    },
    error: function (xhr, status, error) {
      $("#cover").hide();
      console.error("Error:", error);
    showmobilenumber("Error!", error);
    }
  });
}

function closeModal() {
  document.getElementById('policyModal').style.display = 'none';
}