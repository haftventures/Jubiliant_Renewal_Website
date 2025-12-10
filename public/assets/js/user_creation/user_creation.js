$(document).ready(function () {
$(document).on('click','#Btn_back', Btn_back);
$(document).on('click','#addNewBtn', addNewBtn); 
$(document).on('click','#Btn_save', Btn_save);   
$("#ddlonstatus").val("1");
load();
});

var today = new Date();
var tenYearsAgo = new Date();
tenYearsAgo.setFullYear(today.getFullYear() - 10);

flatpickr("#dob", {
  dateFormat: "d/m/Y",
  maxDate: tenYearsAgo,   
  allowInput: false,
  disableMobile: true, 
  onReady: function(_, __, fp) {
    const numInputs = fp.calendarContainer.querySelectorAll(".numInputWrapper");
    numInputs.forEach(el => el.style.display = "none");
    const sel = document.createElement("select");
    sel.className = "fp-year";
    const curY = today.getFullYear();
    for (let y = curY - 50; y <= curY - 10; y++) {
      const opt = document.createElement("option");
      opt.value = y;
      opt.textContent = y;
      sel.appendChild(opt);
    }
    sel.value = fp.currentYear;
    sel.onchange = () => fp.jumpToDate(new Date(sel.value, fp.currentMonth, 1));
    const monthContainer = fp.calendarContainer.querySelector(".flatpickr-current-month");
    if (monthContainer) monthContainer.appendChild(sel);
    fp.calendarContainer.addEventListener("click", () => {
      sel.value = fp.currentYear;
    });
  }
});

flatpickr("#joinDate", {
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

    for (let y = curY - 10; y <= curY; y++) {
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


function formatDate(date) {
  const d = String(date.getDate()).padStart(2, '0');
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const y = date.getFullYear();
  return `${d}/${m}/${y}`;
}

// function viewBtn() {
//   const data = [$('#ddlonstatus').val()];
//   $('#lblupdate').text("2")
//   $.ajax({
//     type: "POST",
//     url: "/createusergrid",
//     traditional: true,
//     data: { data: data },
//     beforeSend: function () {
//       $("#cover").show();
//     },
//     success: function (response) {
//       console.log("Response:", response);
//       $("#cover").hide();
//       $("#search_box").removeClass("hidden");

//       if (response.success == true) {
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
//             // { title: "userid", field: "userid" },
//             { title: "empcode", field: "empcode" },
//             { title: "name", field: "name" },
//             { title: "mobileno", field: "mobileno" },
//             { title: "username", field: "username" },
//             { title: "password", field: "password" },
//             { title: "rolename", field: "rolename" },
//             {
//              title: "Action",
//              formatter: function (cell) {
//              const userid = cell.getRow().getData().userid;
//             return `<u style="color:blue; cursor:pointer;" onclick="usercreation_update(${userid})">View</u>`;
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
//         const branchSelect = document.getElementById('branch');
//         const roleSelect = document.getElementById('designation');
//         branchSelect.innerHTML = '<option value="0">Select</option>';
//         roleSelect.innerHTML = '<option value="0">Select</option>';
//         (response.BranchList || []).forEach(branch => {
//           const opt = document.createElement('option');
//           opt.value = branch.id;
//           opt.textContent = branch.branchname;
//           branchSelect.appendChild(opt);
//         });
//         (response.RoleList || []).forEach(role => {
//           const opt = document.createElement('option');
//           opt.value = role.id;
//           opt.textContent = role.rolename;
//           roleSelect.appendChild(opt);
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
  const data = [$('#ddlonstatus').val()];
  $('#lblupdate').text("2")
  $.ajax({
    type: "POST",
    url: "/createusergrid",
    traditional: true,
    data: { data: data },
    beforeSend: function () {
      $("#cover").show();
    },
    success: function (response) {
      $("#us_cr").removeClass("hidden");
      console.log("Response:", response);
      $("#cover").hide();
      // $("#search_box").removeClass("hidden");

      if (response.success == true) {
       if (window.currentTabulator) {
         window.currentTabulator.destroy();
        }


      
    window.currentTabulator = createThemedGrid(
        "#dynamicTable",
        response.data,
        [
    { title: "S.No.", formatter: "rownum", width: 130, hozAlign: "center" },
    // { title: "userid", field: "userid" },
    { title: "Empcode", field: "empcode", width: 190  },
    { title: "Name", field: "name", width: 250  },
    { title: "Mobileno", field: "mobileno",width: 160 },
    { title: "Username", field: "username",width: 180 },
    { title: "Password", field: "password" ,width: 180  },
    { title: "Rolename", field: "rolename" ,width: 190  },
    {
     title: "Action",
     width: 320,
     formatter: function (cell) {
     const userid = cell.getRow().getData().userid;
    return `<u style="color:blue; cursor:pointer;" onclick="usercreation_update(${userid})">View</u>`;
     }
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
$("#page-size").on("change", function () {
  const newSize = parseInt($(this).val(), 10);
  if (window.currentTabulator && typeof window.currentTabulator.setPageSize === "function") {
    window.currentTabulator.setPageSize(newSize);
  }
});
        const branchSelect = document.getElementById('branch');
        const roleSelect = document.getElementById('designation');
        branchSelect.innerHTML = '<option value="0">Select</option>';
        roleSelect.innerHTML = '<option value="0">Select</option>';
        (response.BranchList || []).forEach(branch => {
          const opt = document.createElement('option');
          opt.value = branch.id;
          opt.textContent = branch.branchname;
          branchSelect.appendChild(opt);
        });
        (response.RoleList || []).forEach(role => {
          const opt = document.createElement('option');
          opt.value = role.id;
          opt.textContent = role.rolename;
          roleSelect.appendChild(opt);
        });

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







function load() {
    const data = ["1"]; 
    $.ajax({
    type: "POST",
    url: "/addnewuser",
    traditional: true,
    data: { data: data },
    beforeSend: function () {
      $("#cover").show();
    },
    success: function (response) {

       const ddlonstatus = document.getElementById('ddlonBranch');
        ddlonstatus.innerHTML = '<option value="0">-- All --</option>';

        (response.BranchList || []).forEach(branch => {
          const opt = document.createElement('option');
          opt.value = branch.id;
          opt.textContent = branch.branchname;
          ddlonstatus.appendChild(opt);
        });
        
      },
      });
} 

function addNewBtn() {
  const data = ["1"]; 
 $('#lblinsert').text("1")
    $.ajax({
    type: "POST",
    url: "/addnewuser",
    traditional: true,
    data: { data: data },
    beforeSend: function () {
      $("#cover").show();
    },
    success: function (response) {
     
       const branchSelect = document.getElementById('branch');
        const roleSelect = document.getElementById('designation');
        branchSelect.innerHTML = '<option value="0">Select</option>';
        roleSelect.innerHTML = '<option value="0">Select</option>';
        (response.BranchList || []).forEach(branch => {
          const opt = document.createElement('option');
          opt.value = branch.id;
          opt.textContent = branch.branchname;
          branchSelect.appendChild(opt);
        });
        (response.RoleList || []).forEach(role => {
          const opt = document.createElement('option');
          opt.value = role.id;
          opt.textContent = role.rolename;
          roleSelect.appendChild(opt);
        });
         $("#empId").val(response.EmpCode);
         $("#mainPage").addClass("hidden");
         $("#savepage").removeClass("hidden");
         $("#branch").val("0");
          $("#company").val("0");
         $("#designation").val("0");
         clearall(".txt_clear");


      
    },
    error: function (xhr, status, error) {
      $("#cover").hide();
      console.error("Error:", error);
    showmobilenumber("Error!", error);
    }
  });
}





function usercreation_update(id) {
  const data = [id];

  $.ajax({
    type: "POST",
    url: "/Dataupdate",
    traditional: true,
    data: { data: data },
    beforeSend: function () {
      $("#cover").show();
    },
    success: function (response) {
      console.log("Response:", response);
      $("#cover").hide();
      const user = response.data[0]; 
        $("#mainPage").addClass("hidden");
        $("#savepage").removeClass("hidden");
        $("#search_box").removeClass("hidden");
        $("#empId").val(user.empcode || "");
        $("#empName").val(user.name || "");
        $("#fatherName").val(user.fathersname || "");
        $("#fatherOcc").val(user.fatheroccupation || "");
        $("#dob").val(user.dob || "");
        $("#qualification").val(user.qualification || "");
        $("#address").val(user.address || "");
        $("#permanentAddress").val(user.Peraddress || "");
        $("#mobile").val(user.mobileno || "");
        $("#altMobile1").val(user.alterno1 || "");
        $("#altMobile2").val(user.alterno2 || "");
        $("#bloodGroup").val(user.bloodgroup || "");
        $("#email").val(user.emailid || "");
        $("#joinDate").val(user.joindate || "");
        $("#username").val(user.username || "");
        $("#password").val(user.password || "");
        $("#confirmPassword").val(user.password || "");
        $("#salary").val(user.salary || "");
        $("#pf").val(user.pf || "");
        $("#esi").val(user.esi || "");
        $("#tds").val(user.td || "");
        $("#deduction").val(user.deduction || "");
        $("#bankName").val(user.bankname || "");
        $("#accNo").val(user.accno || "");
        $("#ifsc").val(user.ifsccode || "");
        $("#branch").val(user.branchid || "");
        $("#designation").val(user.roleid || "");
        $("#status").val(user.statuss);
        $("#lbluserid").text(user.userid || "");
        $("#empId").focus();
    },
    error: function (xhr, status, error) {
      $("#cover").hide();
      console.error("Error:", error);
    showmobilenumber("Error!", error);
    }
  });
}



function Btn_back() {
    $("#mainPage").removeClass("hidden");
  $("#savepage").addClass("hidden");
}

function Btn_save() {
   if (chkdata(".txt_chk") && chk_mobileno(".mob") && chk_validemail("email")) {
  const password = document.getElementById("password");
  const  confirm_password = document.getElementById("confirmPassword");
    if(password.value != confirm_password.value) {
      confirm_password.setCustomValidity("Passwords Don't Match");
      showmobilenumber('Error!','Please make sure password & Confirm password both are same', password);
      return;
    } else {
      confirm_password.setCustomValidity('');
     
    }
   const data = [];
   
   $(".txt_all").each(function () {
  const tag = $(this).prop("tagName").toLowerCase();
  const value = $(this).val();

  if (tag == "select") {
    data.push(value && value !== "0" ? value : "0");
  } else {
    data.push(value ? value : "");
  }
   });

   var userid = $('#lbluserid').text();
   data.push(userid);
   var insert = $('#lblinsert').text();
   var update = $('#lblupdate').text();

   data.push(insert? insert : update);
  
   $.ajax({
    type: "POST",
    url: "/usercreation_Datainsert",
    traditional: true,
    data: { data: data },
    beforeSend: function () {
      $("#cover").show();
    },
    success: function (response) {
     $("#mainPage").removeClass("hidden");
     $("#savepage").addClass("hidden");
     
     showmobilenumber('Success!',response.message);
     $("#lbloutputstatus").text(response.outputstatus);
      // $('#lbloutputstatus').text(response.outputstatus);
    },
    error: function (xhr, status, error) {
      $("#cover").hide();
      console.error("Error:", error);
    showmobilenumber("Error!", error);
    }
  });
}
}

