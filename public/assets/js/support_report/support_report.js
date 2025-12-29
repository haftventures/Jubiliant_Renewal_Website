$(document).ready(function () {
    $(document).on('click', '#viewBtn', () => checkSession(viewBtn));
    $(document).on('click', '#submitBtn', () => checkSession(submitBtn));
    $(document).on('click','#Back_btn', () => checkSession(Back_btn));

function formatDate(date) {
  const d = String(date.getDate()).padStart(2, '0');
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const y = date.getFullYear();
  return `${d}/${m}/${y}`;
}

  $("#FromDate").val(formatDate(firstDayOfMonth));
  $("#ToDate").val(formatDate(today));


    flatpickr("#Payment_Date", {
    dateFormat: "d/m/Y",
    allowInput: true,
  });

  
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
  const data = [$('#FromDate').val(), $('#ToDate').val()];

  $.ajax({
    type: "POST",
    url: "/support_report",
    traditional: true,
    data: { data: data },
    beforeSend: function () {
      $("#cover").show();
    },
    success: function (response) {
      $("#supp_id").removeClass("hidden");
      console.log("Response:", response);
      $("#cover").hide();     
      let success = response.success;

      if (success == true) {
       $("#lbltotal_count").text(response.Count);
if (window.currentTabulator) {
    window.currentTabulator.destroy();
}


createThemedGrid(
    "#dynamicTable",
    response.data,
    
    [
        { title: "S.No.", formatter: "rownum", widthGrow: 1 , hozAlign: "center" },
         { title: "Customer Name ", field: "customername", widthGrow: 1 }, 
        { title: "Date", field: "datee",  widthGrow: 1 },          
        { title: "Vehicle No", field: "vehicleno",  widthGrow: 1 },
         { title: "Make", field: "make",  widthGrow: 1 },
        { title: "Mobile", field: "mobile",  widthGrow: 1 },
        { title: "Model", field: "model",  widthGrow: 1 },
        { title: "engineno", field: "engineno", width: 160 , visible: false },
        { title: "Chasisno", field: "chasisno" , width: 120, minWidth: 120, visible: false },
          { title: "Header", field: "name", width: 100, visible: false  },  
         { title: "Description", field: "description", width: 160, visible: false  },
         {
              title: "Action",
              width: 80,
              formatter: function (cell) {
                const userid = cell.getRow().getData().support_id;
                 $("#lblsupport_id").text(userid);
                let Transaction_id = cell.getRow().getData().transactionid;
                const mobile = cell.getRow().getData().mobile;
                 $("#lblmobileno").text(mobile);
                
                return `<u style="color:blue; cursor:pointer;" onclick="Support_report('${Transaction_id}')">View</u>`;
               
              },
            },
    ],
   
);


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

function Support_report(id) {
 
  $.ajax({
    type: "POST",
    url: "/support_report_view",
    traditional: true,
    data: { id: id },
    beforeSend: function () {
      $("#cover").show();
    },
    success: function (response) {
      $("#mainPage").addClass("hidden");
     $("#Second_Page").removeClass("hidden");
           $("#supp_id").addClass("hidden");
      $("#cover").hide();     
              $("#replyText").val("");
      let success = response.success;

      if (success == true) {
       
if (window.currentTabulator) {
    window.currentTabulator.destroy();
}


createThemedGrid(
    "#Replay_table",
    response.data,
    [
        { title: "S.No.", formatter: "rownum",  widthGrow: 1 , hozAlign: "center" },
        { title: "Date", field: "Datee",  widthGrow: 1 },
         { title: "Transactionid", field: "transactionid",  widthGrow: 1  },      
        { title: "Name", field: "name",  widthGrow: 1  },
         { title: "Description", field: "description",  widthGrow: 2  },
        { title: "Reply Message", field: "reply_message",  widthGrow: 2  },
        { title: "Reply Date", field: "reply_date", width: 150 },
    
    ],
   
);


      } else {
        $("#Replay_table").html('<p class="text-center text-red-600 py-4">No data found</p>');
      }
    },
    error: function (xhr, status, error) {
      $("#cover").hide();
      console.error("Error:", error);
    showmobilenumber("Error!", error);
    }
  });
}



function submitBtn() {
  if (chkdata(".sur_txt_chk")) {
  const data = [$("#lblsupport_id").text(),$("#lblmobileno").text(),$("#replyText").val()];


  $.ajax({
    type: "POST",
    url: "/support_report_save",
    traditional: true,
    data: { data: data },
    beforeSend: function () {
     $("#cover").show();
    },
    success: function (response) {
      $("#cover").hide();     
      $("#mainPage").removeClass("hidden");
     $("#Second_Page").addClass("hidden");
     $("#supp_id").removeClass("hidden");
      
      let success = response.success;
       if (success == true ) {
        showmobilenumber("Success!", response.message);
        // $("#lblinsertedId").text();
        $("#replyText").val("");
       } else if (success == false) {
        showmobilenumber("Error!", response.message);
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

function Back_btn() {
   $("#Second_Page").addClass("hidden");
   $("#mainPage").removeClass("hidden");
   $("#replyText").val("");
     $("#supp_id").removeClass("hidden");
}