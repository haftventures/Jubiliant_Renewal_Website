$(document).ready(function () {

    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    flatpickr("#FromDate", { dateFormat: "d/m/Y", defaultDate: firstDay, disableMobile: true,});
    flatpickr("#ToDate", { dateFormat: "d/m/Y", defaultDate: today, disableMobile: true, });

    $(document).on("click", "#viewBtn", () => checkSession(viewBtn));
    $(document).on("click", "#sendBtn", () => checkSession(sendBtn));
    $("#totalpolicy").hide();
});
function viewBtn() {

    const data = [
        $("#FromDate").val(),
        $("#ToDate").val()        
    ];

    $.ajax({
        type: "POST",
        url: "/show_policy_count",
        data: { data: data },
        traditional: true,

        beforeSend: function () {
            $("#cover").show();
        },
        success: function (res) {               
            $("#cover").hide();
            if (res.success) {
                $("#totalCount").text(res.count);
                $("#div_send").show();
                $("#totalpolicy").show();
            } else {
                showmobilenumber("Error!",res.message);
                $("#totalpolicy").hide();
                $("#div_send").hide();
            }
        },
        error: function (xhr, status, error) {
            $("#cover").hide();
            $("#div_send").hide();
            showmobilenumber("Error!","Request failed: " + error);
        }
    });
}
function sendBtn() {

    const data = [
        $("#FromDate").val(),
        $("#ToDate").val()        
    ];

    $.ajax({
        type: "POST",
        url: "/mass_sms_ids",
        data: { data: data },
        traditional: true,

        beforeSend: function () {
            $("#cover").show();
        },
        success: function (response) {          
             $("#cover").hide();        
            
            if (response.success==true) {
                showmobilenumber("Success!",response.message); // show success alert                
            } else {
                showmobilenumber("Error!",response.message || "Failed to send SMS"); // show failure alert
            }
        },
        error: function (xhr, status, error) {
            $("#cover").hide();
            $("#div_send").hide();
            showmobilenumber("Error!","Request failed: " + error);
        }
    });
}