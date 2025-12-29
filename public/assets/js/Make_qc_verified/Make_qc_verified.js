$(document).ready(function () {
    $(document).on('click', '#viewBtn_pr', () => checkSession(viewBtn));
    $(document).on('click', '#btnmass', () => checkSession(btnmass));
    // $(document).on('click', '#btn_policy_done_excel', () => checkSession(btn_policy_done_excel));
    load();
});

function load() {
  $.ajax({
    type: "GET",
    url: "/make_status_qc_verified",
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
        // const option = '<option value="0">-- Fresh --</option>';

        // FIXED: use data.forEach, not select.data
        data.forEach(element => {
          options += `<option value="${element.id}">${element.permission}</option>`;
        });

        select.innerHTML = options;
      }
    },
    error: function (xhr, status, error) {
      $("#cover").hide();
      console.error("Error:", error);
    }
  });
}

function viewBtn() {

  const data = [$('#status_pr').val().toLowerCase()];
  $.ajax({
    type: "POST",
    url: "/make_verify_details_qc_verified",
    traditional: true,
    data: { data: data },

    beforeSend: function () {
      $("#cover").show();
    },

    success: function (response) {
      const statusPr = document.getElementById("status_pr").value;
      // console.log("Response:", response);
      $("#cover").hide();
      $("#lbltotal_count").text(0);
      if (response.success === true) {
        
  // $("#span_records").text('Fresh Records:');
 if(statusPr==="0"){
  $("#span_records").text('Pending Records:');
 }
 else if(statusPr==="1"){
  $("#span_records").text('True Records:');
 }
  else if(statusPr==="2"){
  $("#span_records").text('False Records:');
 }
 else if(statusPr==="3"){
  $("#span_records").text('Doubt Records:');
 }


  $("#lbltotal_count").text(response.countt);
 $("#div_mass_btn").hide();

  const container = $("#cardContainer");
  container.empty();

  
response.data.forEach(item => {

  const isTrue  = statusPr === "1";
  const isFalse = statusPr === "2";
  const isDoubt = statusPr === "3";

  const card = $(`
    <div class="card-container
                w-[95%] sm:w-[85%] md:w-[75%] lg:w-[70%]
                mx-auto bg-white rounded-xl shadow-md p-4 border
                hover:shadow-lg transition flex flex-col min-h-[260px]"
         data-id="${item.id}">

      <!-- Vehicle No -->
      <div class="mb-3 grid grid-cols-[120px_10px_1fr] sm:grid-cols-[160px_20px_1fr]">
        <span class="text-sm text-gray-500">Vehicle No</span>
        <span class="text-sm text-gray-500 text-center">:</span>
        <span class="font-semibold break-words">${item.vehicleno}</span>
      </div>

      <!-- Old Make / Model -->
      <div class="mb-3 grid grid-cols-[120px_10px_1fr] sm:grid-cols-[160px_20px_1fr]">
        <span class="text-sm text-gray-500">Old Make / Model</span>
        <span class="text-sm text-gray-500 text-center">:</span>
        <span class="text-sm break-words">${item.oldmakemodel || '-'}</span>
      </div>

      <!-- New Make / Model -->
      <div class="mb-4 grid grid-cols-[120px_10px_1fr] sm:grid-cols-[160px_20px_1fr]">
        <span class="text-sm text-gray-500">New Make / Model</span>
        <span class="text-sm text-gray-500 text-center">:</span>
        <span class="text-sm break-words">${item.newmakemodel || '-'}</span>
      </div>

      <!-- IDV + Years -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center mb-4">
        <div><span class="text-xs text-gray-500">1 Year</span><div class="font-semibold">${item.oneyear ? Number(item.oneyear).toLocaleString() : '-'}</div></div>
        <div><span class="text-xs text-gray-500">2 Year</span><div class="font-semibold">${item.twoyear ? Number(item.twoyear).toLocaleString() : '-'}</div></div>
        <div><span class="text-xs text-gray-500">3 Year</span><div class="font-semibold">${item.threeyear ? Number(item.threeyear).toLocaleString() : '-'}</div></div>
        <div><span class="text-xs text-gray-500">IDV</span><div class="font-semibold">${item.idv ? Number(item.idv).toLocaleString() : '-'}</div></div>
      </div>

        <!-- Actions -->
      <div class="mt-auto">
        <div class="flex flex-col sm:flex-row gap-2">

         <!-- TRUE -->
<button
  onclick="makeAction(${item.id}, '1')"
  class="flex-1 text-white py-2 rounded font-semibold hover:bg-green-700"
  style="background:#22DD22">
  TRUE
</button>

<!-- FALSE -->
<button
  onclick="makeAction(${item.id}, '2')"
  class="flex-1 text-white py-2 rounded font-semibold hover:bg-red-700"
  style="background:#FF2E2E">
  FALSE
</button>

<!-- DOUBT -->
<button
  onclick="makeAction(${item.id}, '3')"
  class="flex-1 text-white py-2 rounded font-semibold hover:bg-amber-600"
  style="background:#FFCB2E">
  DOUBT
</button>


        </div>
      </div>

    </div>
  `);
 if(statusPr==="1"){
 $("#div_mass_btn").hide();
}
else{
  $("#div_mass_btn").show();
}
  container.append(card);
});

let cardCount = container.find('.card-container').length;
  $("#lbltotal_counts").text(cardCount);



} else {
  $("#div_mass_btn").hide();
  $("#lbltotal_count").text(0);
  $("#cardContainer").html(
    '<p class="text-center text-red-600 py-4">No data found</p>'
  );
}


//       if (response.success === true) {

//       $("#lbltotal_count").text(response.countt)
//       $("#div_mass_btn").show();
//         // Destroy existing table if present
//         if (window.currentTabulator) {
//           window.currentTabulator.destroy();
//         }

//         // Create grid
//         window.currentTabulator =createThemedGrid(
//           "#dynamicTable",
//           response.data,
//           [
//             // { title: "S.No", formatter: "rownum", widthGrow: 0.69, hozAlign: "center" },
//             // { title: "Name", field: "customername", widthGrow: 1 },
//             { title: "Vehicle No", field: "vehicleno", widthGrow: 0.95,tooltip:true },
//             { title: "Old Make Model", field: "oldmakemodel", widthGrow: 5,tooltip:true  },
//             { title: "New Make Model", field: "newmakemodel", widthGrow: 5 ,tooltip:true },
//             // { title: "CC", field: "cc", widthGrow: 1 },
//             { title: "IDV", field: "idv", widthGrow: 0.5,tooltip:true  },
//             { title: "1 Year", field: "oneyear", widthGrow: 0.69 ,tooltip:true },
//             { title: "2 Year", field: "twoyear", widthGrow: 0.69,tooltip:true  },
//             { title: "3 Year", field: "threeyear", widthGrow: 0.69,tooltip:true  },

//             // {
//             //   title: "",
//             //   widthGrow: 1,
//             //   formatter: function (cell) {
//             //     const id = cell.getRow().getData().id;
//             //     return `<u style="color:#28a745; cursor:pointer;" onclick="makeAction(${id}, '1')">True</u>`;
//             //   }
//             // },
//             {
//   title: "<u style='color:blue; cursor:pointer;'>Update</u>",
//   headerClick: function (e, column) {
//     massupdate_true();
//   },
//   widthGrow: 0.69,
//   formatter: function (cell) {
//     const row = cell.getRow();
//     const id = cell.getRow().getData().id;
//     return `<u style="color:#28a745; cursor:pointer;" onclick="makeAction([${id}], '1')">True</u>`;
//   }
// },

//             {
//               title: "",
//               widthGrow: 0.5,
//               formatter: function (cell) {
//                 const id = cell.getRow().getData().id;
//                 return `<u style="color:#dc3545; cursor:pointer;" onclick="makeAction(${id}, '2')">False</u>`;
//               }
//             },
//             {
//               title: "",
//               widthGrow: 0.5,
//               formatter: function (cell) {
//                 const id = cell.getRow().getData().id;
//                 return `<u style="color:amber; cursor:pointer;" onclick="makeAction(${id}, '3')">Doubt</u>`;
//               }
//             }
//           ],
//           "Vehicle Make Details"
//         );

//       } else {
//         $("#lbltotal_count").text(0)
//         $("#dynamicTable").html(
//           '<p class="text-center text-red-600 py-4">No data found</p>'
//         );
//       }
    },

    error: function (xhr, status, error) {
      $("#cover").hide();
      console.error("Error:", error);
      showmobilenumber("Error!", error);
    }
  });
}
function makeAction(id, action) {

  let message = "";

  if (action === "1") {
    message = "Are you sure you want to mark this as TRUE?";
  } else if (action === "2") {
    message = "Are you sure you want to mark this as FALSE?";
  } else if (action === "3") {
    message = "Are you sure you want to mark this as DOUBT?";
  }

  const status = document.getElementById("status_pr").value;
  let  insert_method="insert";
  if (status === "0") {
    insert_method="insert";
  }
  else{
    insert_method="update";
  }

  showConfirmModal_qc(
    "QC Confirmation",
    message,
    () => {
      $.ajax({
        type: "POST",
        url: "/make_verify_action_qc_verified",
        data: {
          ids: id,
          status: action,
          insert_method: insert_method
        },
        success: function (res) {
          if (res.success) {
            // showmobilenumber("Success!","Status updated successfully");
             // Remove the card
             let container = $("#cardContainer");            

            const statusPr = document.getElementById("status_pr").value;
            let cardCount = container.find('.card-container').length;
            // if(statusPr!=action){
            
            $("#lbltotal_counts").text(cardCount);
            $(`.card-container[data-id='${id}']`).remove();
            let totalCount = parseInt($("#lbltotal_count").text(), 10) || 0;
            let lbltotal_counts = parseInt($("#lbltotal_counts").text(), 10) || 0;
            totalCount = totalCount - 1;
            lbltotal_counts = lbltotal_counts - 1;
           $("#lbltotal_count").text(totalCount);
           $("#lbltotal_counts").text(lbltotal_counts);
            // }

            if(cardCount===0){
              $("#div_mass_btn").hide();
            }
          } else {
            showmobilenumber("Error!",res.message || "Update failed");
          }
        },
        error: function () {
          showmobilenumber("Error!","Server error");
        }
      });
    }
  );
}

// $('#btnmass').on('click', function () {

//   // Get all row IDs
//   const ids = window.currentTabulator
//     .getData()
//     .map(row => row.id);

//   if (ids.length === 0) {
//     alert('No records found');
//     return;
//   }

//   // Confirm before update
//   if (!confirm('Are you sure you want to mark all as TRUE?')) {
//     return;
//   }

//   // AJAX call for mass update
//   $.ajax({
//     type: "POST",
//     url: "/make_verify_action",
//     traditional: true,
//      data: {
//       ids: ids,
//       status: 1   // 1 = TRUE
//     },
//     success: function (res) {
//        $("#cover").hide();
//       if (res.success) {
//         alert("All records updated successfully");
//         viewBtn(); // reload grid
//       } else {
//         alert(res.message || "Update failed");
//       }
//     },
//     error: function () {
//       alert("Server error");
//     }
//   });

// });
function btnmass() {
  // Get all IDs from cards in DOM
  const ids = $(".card-container")
    .map(function () {
      return $(this).data("id"); // get data-id
    })
    .get(); // converts jQuery object to array

  if (ids.length === 0) {
    showmobilenumber("Error!","No records found");
    return;
  }

  const status = document.getElementById("status_pr").value;
  let insert_method="insert";
  if (status === "0") {
    insert_method="insert";
  }
  else{
    insert_method="update";
  }
  showConfirmModal_qc(
    "Confirm Action",
    "Are you sure you want to mark all as TRUE?",
    () => {
      $("#cover").show(); // show loading overlay

      $.ajax({
        type: "POST",
        url: "/make_verify_action_qc_verified",
        traditional: true, // send array properly
        data: {
          ids: ids,
          status: 1, // mark all as TRUE
          insert_method: insert_method
        },
        success: function (res) {
          $("#cover").hide();

          if (res.success) {
            showmobilenumber("Success!","All records updated successfully");

            // Remove all cards from DOM
            $(".card-container").remove();
            viewBtn();

            // Update counts
            // $("#lbltotal_counts").text(0);
            // $("#lbltotal_count").text(0);
            // $("#div_mass_btn").hide();
          } else {
            showmobilenumber("Error!", res.message || "Update failed");
          }
        },
        error: function () {
          $("#cover").hide();
          showmobilenumber("Error!","Server error");
        }
      });
    }
  );
}




