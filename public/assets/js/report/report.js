$(document).ready(function () {

function formatDate(date) {
  const d = String(date.getDate()).padStart(2, '0');
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const y = date.getFullYear();
  return `${d}/${m}/${y}`;
}

  $("#FromDate").val(formatDate(firstDayOfMonth));
  $("#ToDate").val(formatDate(today));

    $(document).on('click', '#viewBtn', viewBtn);
    $(document).on('click', '#Btn_save', Btn_save);
    flatpickr("#Payment_Date", {
    dateFormat: "d/m/Y",
    allowInput: true,
  });

  $(document).on('click','#Btn_back', Btn_back)
});



var today = new Date();
var twoYearsAgo = new Date();
twoYearsAgo.setFullYear(today.getFullYear() - 2);
var firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

 flatpickr("#FromDate", {
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


flatpickr("#ToDate", {
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

 function viewBtn() {
  const data = [$('#FromDate').val(), $('#ToDate').val(),$('#status').val().toLowerCase()];

  $.ajax({
    type: "POST",
    url: "/reportgrid",
    traditional: true,
    data: { data: data },
    beforeSend: function () {
      $("#cover").show();
    },
    success: function (response) {
      console.log("Response:", response);
      $("#cover").hide();     
      let success = response.success;

      if (success == true) {
       
if (window.currentTabulator) {
    window.currentTabulator.destroy();
}


createThemedGrid(
    "#dynamicTable",
    response.data,
    [
        { title: "S.No.", formatter: "rownum", width: 20, hozAlign: "center" },
        { title: "Date", field: "date" },
        { title: "Customer Name", field: "customername" },
        { title: "Mobile", field: "mobile" },
        { title: "Vehicle No", field: "vehicleno" },
        { title: "Make", field: "make" },
        { title: "Model", field: "model" },
        { title: "Transactionid", field: "transactionid" },
        { title: "Email", field: "email" },
        { title: "Policyenddate", field: "policyenddate" },
        { title: "Reg_date", field: "reg_date", hozAlign: "right" },
        { title: "Engineno", field: "engineno" },
        { title: "Chasisno", field: "chasisno" },
        { title: "Payment_mode", field: "payment_mode" },
        { title: "Payment_amount", field: "payment_amount" ,width: 120 },
        { title: "MatchStatus", field: "MatchStatus", width: 100},
    ],
    "Report"
    // true      ------this is every column is searchable or not
);



        // $("#page-size").on("change", function () {
        //   const newSize = parseInt($(this).val(), 10);
        //   table.setPageSize(newSize);
        // });

      

      } else {
        $("#dynamicTable").html('<p class="text-center text-red-600 py-4">No data found</p>');
      }
    },
    error: function (xhr, status, error) {
      $("#cover").hide();
      console.error("Error:", error);
    showmobilenumber("Error!", error);
    }
  });
}

function vehiclesuccess(id){
  $("#mainPage").addClass("hidden");
  $("#savepage").removeClass("hidden");
  $('#lblpolicyid').text(id);
}

function Btn_back() {
  $("#mainPage").removeClass("hidden");
  $("#savepage").addClass("hidden");
}

function Btn_save() {
   const data = [$('#txt_Transaction_Id').val(), $('#txt_Upi_Id').val(),$('#txt_Upi_Name').val(),$('#txt_Amount').val(),$('#Payment_Date').val(),$('#lblpolicyid').text()];
  $.ajax({
    type: "POST",
    url: "/Datasave",
    traditional: true,
    data: { data: data },
    beforeSend: function () {
      $("#cover").show();
    },
    success: function (response) {
      console.log("Response:", response);
      alert(response.message)
      $("#savepage").addClass("hidden");
      $("#mainPage").removeClass("hidden");
    },
    error: function (xhr, status, error) {
      $("#cover").hide();
      console.error("Error:", error);
    showmobilenumber("Error!", error);
    }
  });
}

