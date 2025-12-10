$(document).ready(function () {
$(document).on('click', '#btn_view', btn_view);
Gridload();
});


const yearSelect = document.getElementById("ddlyear");
const monthSelect = document.getElementById("ddlmonth");
const viewButton = document.getElementById("viewButton");

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1; // 1-12
const totalYears = 3; // show +3 years

// Set Years dropdown
for (let i = 0; i <= totalYears; i++) {
    const yearValue = currentYear - i;
    const option = document.createElement("option");
    option.value = yearValue;
    option.textContent = yearValue;
    yearSelect.appendChild(option);
}
yearSelect.value = currentYear;
monthSelect.value = currentMonth;

function Gridload() {
  const month=document.getElementById("ddlmonth").value;
  const year=document.getElementById("ddlyear").value;
  $.ajax({
    type: "POST",
    url: "/dashboard_list",
     data: { month:month,year:year},
    traditional: true,
    beforeSend: function () {
      $("#cover").show();
    },
    success: function (response) {
      console.log("Response:", response);
      $("#cover").hide();     
      if (response.success == true) {
        let Today = response.today
        let Month = response.monthData
        $("#today_linkopen").text(Today.linkopen);
        $("#today_peymentsuccess").text(Today.payment_success);
        $("#today_paymentfailed").text(Today.payment_failed);
        $("#today_kyc").text(Today.kyc);
        $("#today_policyopen").text(Today.policy_open);
        $("#today_policy").text(Today.policy);

        $("#month_linkopen").text(Month.linkopen);
        $("#month_paymentsuccess").text(Month.payment_success);
        $("#month_paymentfailed").text(Month.payment_failed);
        $("#month_kyc").text(Month.kyc);
        $("#month_policyopen").text(Month.policy_open);
        $("#month_policy").text(Month.policy);       
      } 
      else  {
        $("#today_linkopen").text(0);
        $("#today_peymentsuccess").text(0);
        $("#today_paymentfailed").text(0);
        $("#today_kyc").text(0);
        $("#today_policyopen").text(0);
        $("#today_policy").text(0);
        $("#month_linkopen").text(0);
        $("#month_paymentsuccess").text(0);
        $("#month_paymentfailed").text(0);
        $("#month_kyc").text(0);
        $("#month_policyopen").text(0);
        $("#month_policy").text(0);       
      }
    },
    error: function (xhr, status, error) {
      $("#cover").hide();
      console.error("Error:", error);
      showmobilenumber('Error!',error); 
    },
  });
}
function btn_view(){
  Gridload();
}