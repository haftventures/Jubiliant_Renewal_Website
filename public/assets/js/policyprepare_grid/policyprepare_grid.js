$(document).ready(function () {
Gridload();
load();
$(document).on('click', '#save_btn', () => checkSession(Btn_save));
$(document).on('click', '#back_btn', () => checkSession(btn_back));
$(document).on('click', '#refreshBtn',() => checkSession(refreshBtn))

document.getElementById("lbl_pdf_base_string").textContent="";
});
// $("#tlamount").val(1000);
function calculateDifference() {
        let gross = parseFloat($("#txt_grosspremium").val()) || 0; // amount to subtract
        let tla = parseFloat($("#tlamount").val()) || 0;           // main amount

        let diff = tla - gross; // correct formula

        $("#difference_amount").val(diff.toFixed(0));

       if (gross == 0) {
          $("#difference_amount").val("0");
       }

    }

    $("#txt_grosspremium, #tlamount").on("keyup change", calculateDifference);


var today = new Date();
var twoYearsAgo = new Date();
twoYearsAgo.setFullYear(today.getFullYear() - 2);
var firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
var policystartdate = new Date();


flatpickr("#startDate", {
      dateFormat: "d/m/Y",
      
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
  flatpickr("#endDate", {
      dateFormat: "d/m/Y",
      
      allowInput: false,
       disableMobile: true, 
      onReady: function(_, __, fp) {
          const yWrap = fp.calendarContainer.querySelector(".numInputWrapper");
          if (yWrap) yWrap.style.display = "none";
          const sel = document.createElement("select");
          sel.className = "fp-year";
          const curY = new Date().getFullYear();

        for (let y = curY - 2; y <= curY + 5; y++) {
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

// flatpickr("#tlpayment_datee", {
//       dateFormat: "d/m/Y",
//       minDate: twoYearsAgo,
//       maxDate: today,
//       allowInput: false,
//        disableMobile: true, 
//       onReady: function(_, __, fp) {
//           const yWrap = fp.calendarContainer.querySelector(".numInputWrapper");
//           if (yWrap) yWrap.style.display = "none";
//           const sel = document.createElement("select");
//           sel.className = "fp-year";
//           const curY = new Date().getFullYear();

//           for (let y = curY - 2; y <= curY; y++) {
//               const opt = document.createElement("option");
//               opt.value = y;
//               opt.textContent = y;
//               sel.appendChild(opt);
//           }
//           sel.value = fp.currentYear;
//           sel.onchange = () => fp.jumpToDate(new Date(sel.value, fp.currentMonth, 1));
//           fp.calendarContainer.querySelector(".flatpickr-current-month").append(sel);
//           fp.calendarContainer.addEventListener("click", () => {
//               sel.value = fp.currentYear;
//           });
//       }
//   });
// flatpickr("#tlregdate", {
//       dateFormat: "d/m/Y",
//       minDate: twoYearsAgo,
//       maxDate: today,
//       allowInput: false,
//        disableMobile: true, 
//       onReady: function(_, __, fp) {
//           const yWrap = fp.calendarContainer.querySelector(".numInputWrapper");
//           if (yWrap) yWrap.style.display = "none";
//           const sel = document.createElement("select");
//           sel.className = "fp-year";
//           const curY = new Date().getFullYear();

//           for (let y = curY - 25; y <= curY; y++) {
//               const opt = document.createElement("option");
//               opt.value = y;
//               opt.textContent = y;
//               sel.appendChild(opt);
//           }
//           sel.value = fp.currentYear;
//           sel.onchange = () => fp.jumpToDate(new Date(sel.value, fp.currentMonth, 1));
//           fp.calendarContainer.querySelector(".flatpickr-current-month").append(sel);
//           fp.calendarContainer.addEventListener("click", () => {
//               sel.value = fp.currentYear;
//           });
//       }
//   });
// flatpickr("#tldob", {
//       dateFormat: "d/m/Y",
//       minDate: twoYearsAgo,
//       maxDate: today,
//       allowInput: false,
//        disableMobile: true, 
//       onReady: function(_, __, fp) {
//           const yWrap = fp.calendarContainer.querySelector(".numInputWrapper");
//           if (yWrap) yWrap.style.display = "none";
//           const sel = document.createElement("select");
//           sel.className = "fp-year";
//           const curY = new Date().getFullYear();

//           for (let y = curY - 25; y <= curY; y++) {
//               const opt = document.createElement("option");
//               opt.value = y;
//               opt.textContent = y;
//               sel.appendChild(opt);
//           }
//           sel.value = fp.currentYear;
//           sel.onchange = () => fp.jumpToDate(new Date(sel.value, fp.currentMonth, 1));
//           fp.calendarContainer.querySelector(".flatpickr-current-month").append(sel);
//           fp.calendarContainer.addEventListener("click", () => {
//               sel.value = fp.currentYear;
//           });
//       }
//   });


function Gridload() {
  $.ajax({
    type: "POST",
    url: "/policypreparegrid",
    traditional: true,
    beforeSend: function () {
      $("#cover").show();
    },
    success: function (response) {
      console.log("Response:", response);
      $("#cover").hide();
      // $("#search_box").removeClass("hidden");
     
      if (response.success === true) {
        // ✅ Clear old content
       if (window.currentTabulator) {
         window.currentTabulator.destroy();
        }
 

        // 🟦 Create first grid (fresh)
         window.currentTabulator = createThemedGrid(
                "#dynamicTable",
                response.fresh,
                [
            { title: "S.No.", formatter: "rownum",  widthGrow: 1, hozAlign: "center" },
            { title: "Payment Date", field: "payment_datee",  widthGrow: 1 },
            { title: "Customername", field: "customername",  width: '12px'},
            { title: "Mobile", field: "mobile",  widthGrow: 1 },
            { title: "Vehicleno", field: "vehicleno",  widthGrow: 1 },
            { title: "Make", field: "make",  widthGrow: 1 },
            { title: "Model", field: "model",  widthGrow: 1 },
            { title: "Amount", field: "amount", widthGrow: 1 },
            { title: "Kyc Status", field: "kyc_status", widthGrow: 1 },
            // { title: "idv", field: "idv" , width: 80},
            { title: "Transactionid", field: "transactionid",  widthGrow: 1, visible: false  },
            {
              title: "Action",
              widthGrow: 1,
              formatter: function (cell) {
                const userid = cell.getRow().getData().id;
                return `<u style="color:blue; cursor:pointer;" onclick="prepare_pending(${userid})"><i class="fa-solid fa-folder-open"></i></u>`;
            
              },
            },
          ],
         
        );

        // 🟩 Create second grid (waiting)
           window.currentTabulator = createThemedGrid(
                "#gridTable2",
                response.waiting,
                [
            { title: "S.No.", formatter: "rownum",  widthGrow: 1,  hozAlign: "center" },
            { title: "Payment Date", field: "payment_datee", widthGrow: 1},
            { title: "Customername", field: "customername",  width: '12px'},
            { title: "Mobile", field: "mobile",  widthGrow: 1 },
            { title: "Vehicleno", field: "vehicleno",  widthGrow: 1 },
            { title: "Make", field: "make",  widthGrow: 1 },
            { title: "Model", field: "model",  widthGrow: 1 },
            { title: "Amount", field: "amount",  widthGrow: 1 },
            { title: "Kyc Status", field: "kyc_status",  widthGrow: 1 },
            // { title: "idv", field: "idv" },
            { title: "Transactionid", field: "transactionid",  widthGrow: 1, visible: false },
            {
              title: "Action",
               widthGrow: 1,
              formatter: function (cell) {
                const userid = cell.getRow().getData().id;
                return `<u style="color:blue; cursor:pointer;" onclick="update(${userid})"><i class="fa-solid fa-folder-open"></i></u>`;
               
              },
            },
          ],
         
        );

        // 🔍 One shared search box for both grids
        // $("#search_box").off("keyup").on("keyup", function () {
        //   const keyword = $(this).val().toLowerCase();
        //   const filterFn = function (data) {
        //     return Object.values(data).some(val =>
        //       String(val).toLowerCase().includes(keyword)
        //     );
        //   };
        //   table1.setFilter(filterFn);
        //   table2.setFilter(filterFn);
        // });

        // 📄 Shared page size selector
        // $("#page-size").off("change").on("change", function () {
        //   const newSize = parseInt($(this).val(), 10);
        //   table1.setPageSize(newSize);
        //   table2.setPageSize(newSize);
        // });
         $("#lblcount_waiting").text(response.BranchList);
         $("#lblcount_fresh").text(response.RoleList);

      } else  {
        $("#dynamicTable").html('<p class="text-center text-red-600 py-4 bg-gray-200 w-full">No data found</p>');
        $("#gridTable2").html('<p class="text-center text-red-600 py-4 bg-gray-200 w-full">No data found</p>');
      }
    },
    error: function (xhr, status, error) {
      $("#cover").hide();
      console.error("Error:", error);
      showmobilenumber('Error!',error); 
    },
  });
}
function update(id) {
  const data = [id];
  $("#lblpolicyid").text(id);
  $.ajax({
    type: "POST",
    url: "/prepareupdate",
    traditional: true,
    data: { data: data },
    beforeSend: function () {
      $("#cover").show();
    },
    success: function (response) {
      console.log("Response:", response);
      $("#cover").hide();
      const user = response.data[0]; 
        console.log("User Data:", user);
        $("#mainPage").addClass("hidden");
        $("#secoundPage").removeClass("hidden");
        $("#Grid_table_id").addClass("hidden");

        $("#tlcustomerName").val(user.customername || "");
        $("#vehicleNo").val(user.vehicleno || "");
        $("#tlpayment_datee").val(user.payment_datee || "");
        $("#tlamount").val(user.amount || "");
        $("#tlMobile").val(user.mobile || "");
        $("#tlmodel").val(user.model || "");
        $("#tlmake").val(user.make || "");
        $("#tlidv").val(user.idv || "");
        $("#tltransactionid").val(user.transactionid || "");
        $("#tlchasisno").val(user.chasisno || "");
        $("#tlengineno").val(user.engineno || "");

        $("#tlMerchentorderid").val(user.merchantorderid || "");
        $("#tlregdate").val(user.regdate || "");
        $("#tlkycname").val(user.name || "");
        $("#tlpan").val(user.pan || "");
        $("#tldob").val(user.dob || "");
        $("#tlsupport_header").val(user.support_name || "");
        $("#tlsupport_description").val(user.support_description || "");
     
        $("#empId").focus();
    },
    error: function (xhr, status, error) {
      $("#cover").hide();
      console.error("Error:", error);
      showmobilenumber('Error!',error); 
    }
  });
}
function Btn_save() {
  if (
    chkdata(".tl_chk") )
   {

    const formData = new FormData();

    $(".tl_textall").each(function () {
      const value = $(this).val();
      const tag = $(this).prop("tagName").toLowerCase();

      if (tag === "select") {
        formData.append("data[]", value && value !== "0" ? value : "0");
      } else {
        formData.append("data[]", value ? value : "");
      }
    });

    const policyid = $('#lblpolicyid').text();
    formData.append("data[]", policyid);

    const pdfFile = document.getElementById("pdfFile").files[0];
    if (pdfFile) {
      formData.append("pdfFile", pdfFile);
    }

      const difference_amount = $('#difference_amount').val();
      formData.append("data[]", difference_amount);

    $.ajax({
      type: "POST",
      url: "/preparesave",
      data: formData,
      processData: false,
      contentType: false,
      enctype: "multipart/form-data",
      beforeSend: function () {
        $("#cover").show();
      },
      success: function (response) {
        $("#cover").hide();
        if (response.success) {
          showmobilenumber("Success!", response.message);
          $("#secoundPage").addClass("hidden");
          $("#mainPage").removeClass("hidden");
          $("#Grid_table_id").removeClass("hidden");
          $("#lblinsertedId").text(response.insertedId);
          clearall(".tl_clear");
      $("#ddl_ncb").val("0");
      $("#ddl_paymentMode").val("0");
      // $("#secoundPage").addClass("hidden");
      // $("#mainPage").removeClass("hidden"); 
      Gridload();
        }
      },
      error: function (xhr, status, error) {
        $("#cover").hide();
        console.error("Error:", error);
        showmobilenumber("Error!", error);
      },
    });
  }
}

function btn_back() {
  $("#secoundPage").addClass("hidden");
  $("#mainPage").removeClass("hidden"); 
  $("#Grid_table_id").addClass("hidden");

  $("#Grid_table_id").removeClass("hidden");
  $("#grid_tow").removeClass("hidden");
  Gridload();
}

function refreshBtn() {
const icon = document.getElementById("refreshIcon");

  icon.classList.add("spin-once");
  setTimeout(() => {
    icon.classList.remove("spin-once");
  }, 600);
Gridload();
}

function prepare_pending(id) {
  const data = [id, $('#lblprepare_pending').text()];     
  $.ajax({
    type: "POST",
    url: "/prepare_pending",
    traditional: true,
    data: { data: data },
    beforeSend: function () {
      $("#cover").show();
    },
    success: function (response) {
       $("#grid_one").addClass("hidden");
        $("#grid_tow").addClass("hidden");

      if (response.success == true) {    
        update(id);
      } else if (response.success == false) {
        showmobilenumber('Error!',response.message);  
      }
  
    },
    error: function (xhr, status, error) {
      $("#cover").hide();
      console.error("Error:", error);
      showmobilenumber('Error!',error); 
    }
  });
}
document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("pdfFile").addEventListener("change", function (e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = function () {
            const base64String = reader.result.split(",")[1];
            console.log("PDF Base64:", base64String);

            document.getElementById("lbl_pdf_base_string").textContent = base64String;
        };

        reader.readAsDataURL(file);
    });

});


// ___________________________________image script start_______________________

let scale = 1;
let rotation = 0;
let translateX = 0;
let translateY = 0;
let currentIndex = 0;
let imageList = [];

let isDragging = false;
let startX = 0;
let startY = 0;
let startTranslateX = 0;
let startTranslateY = 0;
let rafPending = false;

const img = document.getElementById('policyImage');
const imageListContainer = document.getElementById('imageListContainer');
const fileInput = document.getElementById('fileInput');
const form = document.getElementById('uploadForm');

function updateTransform() {
    img.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale}) rotate(${rotation}deg)`;
}

function resetTransform() {
    scale = 1;
    rotation = 0;
    translateX = 0;
    translateY = 0;
    updateTransform();
}

function highlightActiveButton() {
    const buttons = imageListContainer.querySelectorAll('.image-name-btn');
    buttons.forEach((btn, i) => btn.classList.toggle('active', i === currentIndex));
}

function zoomIn() { scale += 0.1; updateTransform(); }
function zoomOut() { if (scale > 0.2) scale -= 0.1; updateTransform(); }
function rotateLeft() { rotation -= 90; updateTransform(); }
function rotateRight() { rotation += 90; updateTransform(); }

function showImage() {
    if (imageList.length > 0) {
        img.src = imageList[currentIndex];
        resetTransform();
        highlightActiveButton();
    }
}

function prevImage() {
    if (currentIndex > 0) {
        currentIndex--;
        showImage();
    }
}

function nextImage() {
    if (currentIndex < imageList.length - 1) {
        currentIndex++;
        showImage();
    }
}

async function loadImages(user, vehicleno) {
    const res = await fetch(`/get-images/${user}/${vehicleno}`);
    const data = await res.json();
    if (data.success && data.images.length > 0) {
        imageList = data.images;
        currentIndex = 0;
        showImage();
        renderImageList();
    } else {
        img.src = '';
        imageList = [];
        imageListContainer.innerHTML = '<p>No images found for this vehicle.</p>';
    }
}

function renderImageList() {
    imageListContainer.innerHTML = '';
    imageList.forEach((imagePath, index) => {
        const imageName = imagePath.split('/').pop();
        const btn = document.createElement('button');
        btn.textContent = imageName;
        btn.classList.add('image-name-btn');
        if (index === currentIndex) btn.classList.add('active');
        btn.addEventListener('click', () => {
            currentIndex = index;
            showImage();
        });
        imageListContainer.appendChild(btn);
    });
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const res = await fetch('/upload', { method: 'POST', body: formData });
    const data = await res.json();
    alert(data.message);
    if (data.file && data.file.path) {
        const user = 'user';
        const vehicleno = document.getElementById('vehicleNo').value || 'vehicleno';
        await loadImages(user, vehicleno);
    }
});

fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (ev) => {
            img.src = ev.target.result;
            resetTransform();
        };
        reader.readAsDataURL(file);
    }
});

img.addEventListener('mousedown', (e) => {
    if (!e.ctrlKey) {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        startTranslateX = translateX;
        startTranslateY = translateY;
        img.style.cursor = 'grabbing';
        e.preventDefault();
    }
});

window.addEventListener('mouseup', () => {
    if (isDragging) {
        isDragging = false;
        img.style.cursor = scale > 1 ? 'grab' : 'default';
    }
});

window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    if (!rafPending && !e.ctrlKey) {
        rafPending = true;
        requestAnimationFrame(() => {
            const diffX = e.clientX - startX;
            const diffY = e.clientY - startY;
            translateX = startTranslateX + diffX;
            translateY = startTranslateY + diffY;
            updateTransform();
            rafPending = false;
        });
    }
});

img.addEventListener('wheel', (e) => {
    e.preventDefault();
    const zoomStep = 0.1;
    const zoomAmount = e.deltaY < 0 ? zoomStep : -zoomStep;
    scale += zoomAmount;
    if (scale < 0.2) scale = 0.2;
    if (scale > 5) scale = 5;
    requestAnimationFrame(updateTransform);
}, { passive: false });

window.addEventListener('keydown', (e) => {
    if (e.key === 'Control' && scale > 1) img.style.cursor = 'grab';
});

window.addEventListener('keyup', (e) => {
    if (e.key === 'Control' && !isDragging)
        img.style.cursor = scale > 1 ? 'grab' : 'default';
});

window.addEventListener('DOMContentLoaded', () => {
    const user = 'user';
    const vehicleno = 'vehicleno';
    loadImages(user, vehicleno);
});


// ___________________________________image script end_________________________

function load() {
    $.ajax({
    type: "Get",
    url: "/Get_companyname",
    traditional: true,
    beforeSend: function () {
      $("#cover").show();
    },
    success: function (response) {

       const ddlonstatus = document.getElementById('ddl_Company');
        ddlonstatus.innerHTML = '<option value="0">Select</option>';

        (response.data || []).forEach(branch => {
          const opt = document.createElement('option');
          opt.value = branch.id;
          opt.textContent = branch.companyname;
          ddlonstatus.appendChild(opt);
        });
        
      },
      });
} 
