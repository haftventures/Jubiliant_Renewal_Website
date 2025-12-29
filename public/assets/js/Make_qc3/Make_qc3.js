$(document).ready(function () {
  $(document).on("click", "#viewBtn", () => checkSession(viewBtn));
  $(document).on("click", "#qc3_back", () => checkSession(qc3_back));
  $(document).on("click", "#qc3_save", () => checkSession(qc3_save));
  $(document).on("click", "#deleteBtn", () => checkSession(deleteBtn));
    function formatDate(date) {
  const d = String(date.getDate()).padStart(2, '0');
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const y = date.getFullYear();
  return `${d}/${m}/${y}`;
}

  $("#FromDate").val(formatDate(firstDayOfMonth));
  $("#ToDate").val(formatDate(today));

  
$('#qc3_newMakeModel').on('input', function () {
  const v = this.value;
  if (!v) return $('#results-list').hide();
  $.ajax({
    url: '/makeqc3_search',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({ make: v, companyid: 7 }),

    beforeSend: () => $('#input_loader').show(), 

    success: r => {
      
      $('#results-list').html(
        (r.result || []).map(i =>
          `<li class="cursor-pointer ms-2 p-1 uppercase hover:bg-orange-500 hover:text-white text-[12px]"
           onclick="list_select('${i.makedescrip}',${i.id})">${i.makedescrip}</li>`
        ).join('')
      ).show();
    },

    complete: () => $('#input_loader').hide()      // hide loader
  });
  });


});

function list_select(name, id) {
  $('#qc3_newMakeModel').val(name);
  $("#lblmakeid").text(id);
  console.log(id);
  $('#results-list').hide();
}

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

  // const data = [$('#FromDate').val(), $('#ToDate').val()];
  $.ajax({
    type: "GET",
    url: "/Make_qc_verified3",
    traditional: true,
    // data: { data: data },

    beforeSend: function () {
      $("#cover").show();
    },

    success: function (response) {
        $("#cover").hide();
           if (window.currentTabulator) {
            window.currentTabulator.destroy();
          }
          $("#table_Container").removeClass("hidden");
           $("#lbltotal_count").text(response.count);

          window.currentTabulator = createThemedGrid(
            "#dynamicTable_make_qc3",
            response.data,
            [
              { title: "S.No.", formatter: "rownum", widthGrow: 1, hozAlign: "center" },
              { title: "Customer Name", field: "customername", widthGrow: 2 },
              { title: "New Make Model", field: "newmakemodel", widthGrow: 2 },
              { title: "Old Make Model ", field: "oldmakemodel", widthGrow: 2 },
              { title: "Vehicleno ", field: "vehicleno", widthGrow: 2 },
             
             {
     title: "Action",
      widthGrow: 2,
     formatter: function (cell) {
     const id = cell.getRow().getData().excelid;
     const customername = cell.getRow().getData().customername;
     const oldmakemodel = cell.getRow().getData().oldmakemodel;
     const vehicleno = cell.getRow().getData().vehicleno;
    return `<u style="color:blue; cursor:pointer;"onclick="Make_qc3_update(${id}, '${customername}', '${oldmakemodel}', '${vehicleno}')">View</u>`;

     }
    }
            ]
          );

   const excelBtn = document.getElementById("ex_excel");
    },

    error: function (xhr, status, error) {
      $("#cover").hide();
      console.error("Error:", error);
      showmobilenumber("Error!", error);
    }
  });
}

function Make_qc3_update(id, name, oldmakemodel, vehicleno) {
 $("#lblexcelid").text(id);
 $("#mainPage").addClass("hidden");
 $("#savepage").removeClass("hidden");
 $("#table_Container").addClass("hidden");

  $("#qc3_name").val(name);
   $("#qc3_vehicleNo").val(vehicleno);
    $("#qc3_oldMakeModel").val(oldmakemodel);

}

function qc3_back() {
  $("#mainPage").removeClass("hidden");
  $("#savepage").addClass("hidden");
  $("#table_Container").removeClass("hidden");  
   clearall(".txt_makeqc_3_all")
}


function qc3_save() {

if (chkdata(".txt_makeqc_3_chk")) {

  const data = [];
  const excelid = $("#lblexcelid").text();
  const lblmakeid = $("#lblmakeid").text();
   $(".txt_makeqc_3").each(function () {
    data.push($(this).val().trim());   
   });

  

   data.push(excelid);
   data.push(lblmakeid);

    $.ajax({
    type: "POST",
    url: "/makeqc3_save",
    traditional: true,
    data: { data: data },

    beforeSend: function () {
      $("#cover").show();
    },

    success: function (response) {
        $("#cover").hide();
      if (response.success == true) {     
        showmobilenumber("Success!", response.message);
        clearall(".txt_makeqc_3_all");
          $("#mainPage").removeClass("hidden");
  $("#savepage").addClass("hidden");
  $("#table_Container").removeClass("hidden");  
  viewBtn()
      } else {
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

function deleteBtn() {
  showConfirmModal_qc(
    "Are you sure",
    "You want to delete this record?",
    function () {
      // ✅ Only runs when YES is clicked
      const data = [$("#lblexcelid").text()];

      $.ajax({
        type: "POST",
        url: "/makeqc3_delete",
        traditional: true,
        data: { data },

        beforeSend: () => $("#cover").show(),

        success: (response) => {
          $("#cover").hide();
          if (response.success === true) {
            showmobilenumber("Success!", response.message);
            $("#mainPage").removeClass("hidden");
            $("#savepage").addClass("hidden");
            $("#table_Container").removeClass("hidden");
            clearall(".txt_makeqc_3_all");
            viewBtn()
          }
        },

        error: (xhr, status, error) => {
          $("#cover").hide();
          showmobilenumber("Error!", error);
        }
      });
    }
  );
}
