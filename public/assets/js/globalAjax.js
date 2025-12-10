// GLOBAL AJAX HANDLERS
$(document).ajaxStart(function () {
    $("#cover").fadeIn(100);  // smooth
});

$(document).ajaxStop(function () {
    $("#cover").fadeOut(100);
    $("body").removeClass("body"); 
});


window.addEventListener("load", function () {
    // Ensure cover is initially hidden, then make it visible for the fadeOut animation
    $("#cover").addClass("hidden");

    setTimeout(() => {
        $("#cover").show().removeClass("hidden").fadeOut(1000, function () {
            $("body").removeClass("body"); // Re-enable scroll after fade out
        });
    }, 0);
});
