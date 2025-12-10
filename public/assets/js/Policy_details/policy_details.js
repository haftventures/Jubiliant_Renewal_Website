$(document).ready(function () {

    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    flatpickr("#FromDate", { dateFormat: "d/m/Y", defaultDate: firstDay, disableMobile: true, });
    flatpickr("#ToDate", { dateFormat: "d/m/Y", defaultDate: today, disableMobile: true, });

    $(document).on("click", "#viewBtn", viewBtn);
    $(document).on("click", "#sendBtn", sendBtn);
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

                    { title: "Date", field: "upload_date", width: 100 },
                    { title: "Customer Name", field: "customername", width: 150 },
                    { title: "Mobile", field: "mobile", width: 100 },
                    { title: "Vehicle No", field: "vehicleno", width: 100 },
                    { title: "Make", field: "make", width: 150 },
                    { title: "Model", field: "model", width: 150 },
                    { title: "Transaction ID", field: "transactionid", width: 150 },
                    { title: "Reg Date", field: "regdate", width: 100 },
                    { title: "Engine No", field: "engineno", width: 200 },
                    { title: "Chassis No", field: "chasisno", width: 200 },

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