$(document).ready(function () {

    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    flatpickr("#FromDate", { dateFormat: "d/m/Y", defaultDate: firstDay, disableMobile: true, });
    flatpickr("#ToDate", { dateFormat: "d/m/Y", defaultDate: today, disableMobile: true, });

    $(document).on("click", "#viewBtn", () => checkSession(viewBtn));
    $(document).on("click", "#sendBtn", () => checkSession(sendBtn));

        $(document).on("click", "#AddnewBtn", () => checkSession(AddnewBtn));
        $(document).on("click", "#Btn_back", () => checkSession(Btn_back));
        $(document).on("click", "#Btn_save", () => checkSession(Btn_save));

const curY = today.getFullYear();

flatpickr("#regDate", {
  dateFormat: "d/m/Y",
  maxDate: today,          // ⛔ no future dates
  allowInput: false,
  disableMobile: true,

  onReady: function (_, __, fp) {

    // Hide default year input
    const numInputs = fp.calendarContainer.querySelectorAll(".numInputWrapper");
    numInputs.forEach(el => el.style.display = "none");

    // Custom year select
    const sel = document.createElement("select");
    sel.className = "fp-year";

    // ✅ Year list: 2025 → 2010 (example)
    for (let y = curY; y >= curY - 15; y--) {
      const opt = document.createElement("option");
      opt.value = y;
      opt.textContent = y;
      sel.appendChild(opt);
    }

    sel.value = fp.currentYear;

    sel.onchange = () => {
      fp.jumpToDate(new Date(sel.value, fp.currentMonth, 1));
    };

    const monthContainer = fp.calendarContainer.querySelector(".flatpickr-current-month");
    if (monthContainer) monthContainer.appendChild(sel);

    fp.calendarContainer.addEventListener("click", () => {
      sel.value = fp.currentYear;
    });
  }
});

// past 6 months
const past6Months = new Date();
past6Months.setMonth(today.getMonth() - 6);

// future 5 years
const future5Years = new Date();
future5Years.setFullYear(today.getFullYear() + 5);

flatpickr("#policyEndDate", {
  dateFormat: "d/m/Y",

  // ✅ allow past 6 months → future 5 years
  minDate: past6Months,
  maxDate: future5Years,

  allowInput: false,
  disableMobile: true,

  onReady: function (_, __, fp) {

    // ❌ hide default year input
    const yWrap = fp.calendarContainer.querySelector(".numInputWrapper");
    if (yWrap) yWrap.style.display = "none";

    // ✅ custom year dropdown
    const sel = document.createElement("select");
    sel.className = "fp-year";

    const curY = today.getFullYear();

    // ✅ year range: current-1 → current+5
    for (let y = curY - 0; y <= curY + 5; y++) {
      const opt = document.createElement("option");
      opt.value = y;
      opt.textContent = y;
      sel.appendChild(opt);
    }

    sel.value = fp.currentYear;

    sel.onchange = () => {
      fp.jumpToDate(new Date(sel.value, fp.currentMonth, 1));
    };

    const monthWrap = fp.calendarContainer.querySelector(".flatpickr-current-month");
    if (monthWrap) monthWrap.appendChild(sel);

    // keep dropdown synced
    fp.calendarContainer.addEventListener("click", () => {
      sel.value = fp.currentYear;
    });
  }
});

});

function viewBtn() {

    const data = [
        $("#FromDate").val(),
        $("#ToDate").val(),
        1
    ];

    $.ajax({
        type: "POST",
        url: "/policydetailgrid_hari",
        data: { data: data },
        traditional: true,

        beforeSend: function () {
            $("#cover").show();
        },

        success: function (response) {
            $("#lbltotal_count").text(response.Count)
            $("#cover").hide();
            $("#div_send").hide();
            $("#table_Container").removeClass("hidden");
            // -------------------------------
            // If no rows returned
            // -------------------------------
            if (!(response.success && response.data.length > 0)) {

                // alert("No rows available!");
                showmobilenumber("Error!", "No rows available!");
                if (window.currentTabulator) {
                    window.currentTabulator.destroy();
                    window.currentTabulator = null;
                }

                $("#dynamicTable").empty();
                $("#div_send").hide();

                const toolbarId = "dynamicTable-toolbar";
                if (document.getElementById(toolbarId)) {
                    document.getElementById(toolbarId).remove();
                }

                $(".tabulator-footer").hide();
                $(".tabulator-header").hide();

                return;
            }

            // -------------------------------
            // Destroy old table
            // -------------------------------
            if (window.currentTabulator) {
                window.currentTabulator.destroy();
            }

            // -------------------------------
            // Create new table
            // -------------------------------
            window.currentTabulator = createThemedGrid(
                "#dynamicTable",
                response.data,
                [

                    // -----------------------------------------
                    // Select All Checkbox Column
                    // -----------------------------------------
                    {
                        title: `
                            <label style='display:flex;align-items:center;gap:6px;cursor:pointer;'>
                                <span>Select All</span>
                                <input type="checkbox" id="header-checkbox" 
                                       style='width:18px;height:18px;cursor:pointer;' />
                            </label>`,
                        field: "select",
                        width: 120,
                        hozAlign: "center",
                        headerSort: false,
                        formatter: "rowSelection"
                    },

                    // -----------------------------------------
                    // Other Table Columns
                    // -----------------------------------------
                    {
                        title: "S.No.",
                        width: 100,
                        hozAlign: "center",
                        formatter: (cell) =>
                            (cell.getTable().getPageSize() * (cell.getTable().getPage() - 1)) +
                            cell.getRow().getPosition(true)
                    },

                    { title: "Date", field: "upload_date", widthGrow: 1 },
                    { title: "Customer Name", field: "customername", widthGrow: 1 },
                    { title: "Mobile", field: "mobile", widthGrow: 1 },
                    { title: "Vehicle No", field: "vehicleno", widthGrow: 1 },
                    { title: "Make", field: "make", widthGrow: 1 },
                    { title: "Model", field: "model", widthGrow: 1 },
                    { title: "Transaction ID", field: "transactionid", widthGrow: 1, visible: false },
                    { title: "Reg Date", field: "regdate", widthGrow: 1 },
                    { title: "Engine No", field: "engineno", widthGrow: 1 },
                    { title: "Chassis No", field: "chasisno", widthGrow: 1 },

                ],
                "Policy_Details"
            );

            // -----------------------------------------
            // Select All — Only Current Page
            // -----------------------------------------
            $(document).off("change", "#header-checkbox").on("change", "#header-checkbox", function () {

                const table = window.currentTabulator;
                const isChecked = $(this).prop("checked");

                const currentPage = table.getPage();
                const pageSize = table.getPageSize();

                const allRows = table.getRows();
                const start = (currentPage - 1) * pageSize;
                const end = start + pageSize;

                const rowsOnPage = allRows.slice(start, end);

                if (isChecked) {
                    rowsOnPage.forEach(r => r.select());
                } else {
                    rowsOnPage.forEach(r => r.deselect());
                }
            });

            // Show "SEND" panel
            $("#div_send").css("display", "flex");
        },

        error: function (xhr, status, error) {
            $("#cover").hide();
            $("#div_send").hide();
            showmobilenumber("Error!" , error);
        }
    });
}


const selectedRowIds = new Set();

// Header checkbox click event - selects/deselects current page rows and updates global set
$("#dynamicTable").on("click", "#header-checkbox", function () {
    const checked = $(this).prop("checked");
    const currentPage = window.currentTabulator.getPage();
    const pageSize = window.currentTabulator.getPageSize();
    const allRows = window.currentTabulator.getRows();
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const rowsOnPage = allRows.slice(startIndex, endIndex);

    rowsOnPage.forEach(row => {
        const rowId = row.getData().id;
        if (checked) {
            row.select();
            selectedRowIds.add(rowId);
        } else {
            row.deselect();
            selectedRowIds.delete(rowId);
        }
    });

    // Alert or console log for current page selected IDs
    const selectedRows = rowsOnPage.filter(row => row.isSelected());
    const ids = selectedRows.map(row => row.getData().id);
    // alert("Checked IDs (Current Page): " + ids.join(", "));
    // console.log("Checked IDs (Current Page):", ids);
});

function unselectAllRows() {
    // Clear the global set of selected IDs
    selectedRowIds.clear();

    // Deselect all rows in the table
    window.currentTabulator.getRows().forEach(row => {
        row.deselect();
    });

    // Uncheck header checkbox
    $("#header-checkbox").prop("checked", false);

    // console.log("All rows deselected.");
}
function sendBtn() {

    const rowscount=selectedRowIds.size;

    if(rowscount==0){         
    const table = window.currentTabulator;
    const selectedIds = table.getSelectedData().map(r => r.id);
    selectedRowIds.clear();          // clear previous values
    selectedIds.forEach(id => selectedRowIds.add(id));   // add new values
    };
    
    $.ajax({
        type: "POST",
        url: "/selected_ids",
        contentType: "application/json; charset=utf-8",
         dataType: "json",
        data: JSON.stringify({ data: Array.from(selectedRowIds) }), // send proper JSON body
        beforeSend: function () {
            $("#cover").show();
        },
        success: function (response) {
             if (response.success) {
                showmobilenumber("Success!",response.message); // show success alert
                unselectAllRows();       // clear selection after sending
            } else {
                showmobilenumber("Error!",response.message || "Failed to send SMS"); // show failure alert
            }
            // console.log("Server response:", response);
        },
        error: function (xhr, status, error) {
            console.error("Request failed:", error);
            showmobilenumber("Error!","An error occurred while sending SMS");
        },
        complete: function () {
            $("#cover").hide();
        }
    });
}


function AddnewBtn() {
    $("#mainPage").addClass("hidden");
    $("#savepage").removeClass("hidden");   
      $("#table_Container").addClass("hidden"); 
        clearall(".pd_txt_clear");    
}

function Btn_back() {
    $("#savepage").addClass("hidden");
    $("#mainPage").removeClass("hidden");     
      clearall(".pd_txt_clear");
    // viewBtn()  
      $("#table_Container").removeClass("hidden"); 
}

function Btn_save() {
  if (chkdata(".pd_txt_chk") && chk_mobileno(".mobileNo") && chk_vehicleno(".vehicleNo") && chk_engine("engineNo") && chk_chasis("chassisNo")) {

  // ✅ Collect input values
  const data = [];
  $(".pd_txt_all").each(function () {
    data.push($(this).val());
  });

  console.log(data);
  $.ajax({
        type: "POST",
        url: "/policy_details_save",
        data: { data: data },
        traditional: true,

        beforeSend: function () {
            $("#cover").show();
        },

        success: function (response) {
            $("#cover").hide();

            if (response.success == true) {
                showmobilenumber("Success!", response.message);
                   $("#savepage").addClass("hidden");
                  $("#mainPage").removeClass("hidden"); 
                //   viewBtn() 
                  $("#table_Container").removeClass("hidden"); 
                  clearall(".pd_txt_clear");
            } else {
                showmobilenumber("Error!", response.message || "Failed to save policy details");
            }

        },

        error: function (xhr, status, error) {
            $("#cover").hide();
            $("#div_send").hide();
            showmobilenumber("Error!" , error);
        }
    });

}
}