
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
  maxDate: "today",       
  allowInput: false,
  disableMobile: true, 
  onReady: function(_, __, fp) {
    const yWrap = fp.calendarContainer.querySelector(".numInputWrapper");
    if (yWrap) yWrap.style.display = "none";

    const sel = document.createElement("select");
    sel.className = "fp-year";
    const curY = new Date().getFullYear();

    for (let y = curY - 1; y <= curY; y++) {
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

//  function viewBtn() {
//   const data = [$('#FromDate').val(), $('#ToDate').val()];

//   $.ajax({
//     type: "POST",
//     url: "/vehiclegrid",
//     traditional: true,
//     data: { data: data },
//     beforeSend: function () {
//       $("#cover").show();
//     },
//     success: function (response) {
//       console.log("Response:", response);
//       $("#cover").hide();
//       $("#search_box").removeClass("hidden");
//       if (response.success && response.data && response.data.length > 0) {
//         $("#dynamicTable").html("");
//         const table = new Tabulator("#dynamicTable", {
//           data: response.data, 
//           layout: "fitDataStretch",
//           pagination: "local",
//           paginationSize: 10,
//           paginationSizeSelector: [10, 25, 50, 100],
//           movableColumns: true,
//           columns: [
//             { title: "S.No.", formatter: "rownum", width: 70, hozAlign: "center" },
//             { title: "Customer Name", field: "customername" },
//             { title: "Mobile", field: "mobile" },
//             { title: "Vehicle No", field: "vehicleno" },
//             { title: "Make", field: "make" },
//             { title: "Model", field: "model" },
//             { title: "Year", field: "year" },
//             { title: "Idv", field: "idv" },
//             { title: "Cc", field: "cc" },
//             { title: "Od", field: "od" },
//             { title: "tp", field: "tp" },
//               { title: "Netpremium", field: "netpremium" },
//                { title: "Grosspremium", field: "grosspremium" },
//                  { title: "Transactionid", field: "transactionid" },
          
//                { title: "Prev Policyno", field: "prev_policyno" },
//             { title: "Amount", field: "paymentamount", hozAlign: "right" },
//             { title: "Payment Date", field: "datee" },
//             { title: "One year", field: "oneyear" },
//             {
//              title: "Action",
//              formatter: function (cell) {
//              const id = cell.getRow().getData().id;
//              return `<u style="color:blue; cursor:pointer;" onclick="vehiclesuccess(${id})">View</u>`;
//              },
// },

// {
//              title: "Action",
//              formatter: function (cell) {
//              return `<u style="color:blue; cursor:pointer;">Resend</u>`;
//              },
// }

//           ]
//         });
//         $("#search_box").on("keyup", function () {
//           const keyword = $(this).val().toLowerCase();
//           table.setFilter(function (data) {
//             return Object.values(data).some(val =>
//               String(val).toLowerCase().includes(keyword)
//             );
//           });
//         });
//         $("#page-size").on("change", function () {
//           const newSize = parseInt($(this).val(), 10);
//           table.setPageSize(newSize);
//         });
//         document.querySelectorAll("[data-download]").forEach(button => {
//           button.addEventListener("click", function () {
//             const type = this.getAttribute("data-download");
//             if (type === "csv") {
//               table.download("csv", "vehicle_data.csv");
//             } else if (type === "xlsx") {
//               table.download("xlsx", "vehicle_data.xlsx", { sheetName: "Vehicle Report" });
//             }
//           });
//         });
//       } else {
//         $("#dynamicTable").html('<p class="text-center text-red-600 py-4">No data found</p>');
//       }
//     },
//     error: function (xhr, status, error) {
//       $("#cover").hide();
//       console.error("Error:", error);
//     showmobilenumber("Error!", error);
//     }
//   });
// }


 function viewBtn() {
  const data = [$('#FromDate').val(), $('#ToDate').val()];

  $.ajax({
    type: "POST",
    url: "/vehiclegrid",
    traditional: true,
    data: { data: data },
    beforeSend: function () {
      $("#cover").show();
    },
    success: function (response) {
      console.log("Response:", response);
      $("#cover").hide();
      // $("#search_box").removeClass("hidden");
      if (response.success && response.data && response.data.length > 0) {
        if (window.currentTabulator) {
         window.currentTabulator.destroy();
        }
       window.currentTabulator = createThemedGrid(
                "#dynamicTable",
                response.data,
                [
            { title: "S.No.", formatter: "rownum", width: 70, hozAlign: "center" },
            { title: "Customer Name", field: "customername" },
            { title: "Mobile", field: "mobile" },
            { title: "Vehicle No", field: "vehicleno" },
            { title: "Make", field: "make" },
            { title: "Model", field: "model" },
            { title: "Year", field: "year" },
            { title: "Idv", field: "idv" },
            { title: "Cc", field: "cc" },
            { title: "Od", field: "od" },
            { title: "tp", field: "tp" },
              { title: "Netpremium", field: "netpremium" },
               { title: "Grosspremium", field: "grosspremium" },
                 { title: "Transactionid", field: "transactionid" },
          
               { title: "Prev Policyno", field: "prev_policyno" },
            { title: "Amount", field: "paymentamount", hozAlign: "right" },
            { title: "Payment Date", field: "datee" },
            { title: "One year", field: "oneyear" },
            {
             title: "Action",
             formatter: function (cell) {
             const id = cell.getRow().getData().id;
             return `<u style="color:blue; cursor:pointer;" onclick="vehiclesuccess(${id})">View</u>`;
             },
},

{
             title: "Action",
             formatter: function (cell) {
             return `<u style="color:blue; cursor:pointer;">Resend</u>`;
             },
}

          ]
        );
        // $("#search_box").on("keyup", function () {
        //   const keyword = $(this).val().toLowerCase();
        //   table.setFilter(function (data) {
        //     return Object.values(data).some(val =>
        //       String(val).toLowerCase().includes(keyword)
        //     );
        //   });
        // });
        // $("#page-size").on("change", function () {
        //   const newSize = parseInt($(this).val(), 10);
        //   table.setPageSize(newSize);
        // });
        // document.querySelectorAll("[data-download]").forEach(button => {
        //   button.addEventListener("click", function () {
        //     const type = this.getAttribute("data-download");
        //     if (type === "csv") {
        //       table.download("csv", "vehicle_data.csv");
        //     } else if (type === "xlsx") {
        //       table.download("xlsx", "vehicle_data.xlsx", { sheetName: "Vehicle Report" });
        //     }
        //   });
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
    if (chkdata(".vehicle_txt_chk")) {
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
      showmobilenumber("Success!",response.message);
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
}