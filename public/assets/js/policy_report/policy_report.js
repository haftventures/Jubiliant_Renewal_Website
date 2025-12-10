$(document).ready(function () {

function formatDate(date) {
  const d = String(date.getDate()).padStart(2, '0');
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const y = date.getFullYear();
  return `${d}/${m}/${y}`;
}

  $("#FromDate_pr").val(formatDate(firstDayOfMonth));
  $("#ToDate_pr").val(formatDate(today));

    $(document).on('click', '#viewBtn_pr', viewBtn_pr);
    load();
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
   
  const data = [$('#FromDate_pr').val(), $('#ToDate_pr').val(),$('#status_pr').val().toLowerCase()];

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
       
if (window.currentTabulator) {
    window.currentTabulator.destroy();
}


createThemedGrid(
    "#dynamicTable_pr",
    response.data,
    [
        { title: "S.No.", formatter: "rownum", width: 20, hozAlign: "center" },
        { title: "Date", field: "date" },
        { title: "Customer Name", field: "customername" },
        { title: "Mobile", field: "mobile" },
        { title: "Vehicle No", field: "vehicleno" },
        { title: "Make", field: "make" },
        { title: "Model", field: "model" },
        { title: "Cc", field: "cc" },
        { title: "Engineno", field: "engineno" },
        { title: "Chasisno", field: "chasisno" },
        { title: "Transactionid", field: "transactionid", hozAlign: "right" },
    ],
   
);

      } else {
        $("#dynamicTable_pr").html('<p class="text-center text-red-600 py-4">No data found</p>');
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
