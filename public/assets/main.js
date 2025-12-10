  // Toggle mobile menu
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const profileSection = document.getElementById('profileSection');
    
    menuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      profileSection.classList.toggle('active');
      
      // Change icon based on menu state
      const icon = this.querySelector('i');
      if (icon.classList.contains('fa-bars')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
        // $("#scroller").show();
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        //  $("#scroller").hide();
      }
    });
    
    // Close menu when clicking outside on mobile
    document.addEventListener('click', function(e) {
      if (window.innerWidth <= 768 && 
          !e.target.closest('.navbar') && 
          !e.target.closest('.menu-toggle')) {
        navLinks.classList.remove('active');
        profileSection.classList.remove('active');
        menuToggle.querySelector('i').classList.remove('fa-times');
        menuToggle.querySelector('i').classList.add('fa-bars');
      }
    });

window.addEventListener("load", function () {
  $(".div_loader").removeClass("hidden");

  setTimeout(() => {
    $(".div_loader").fadeOut(1000, function () {
      $("body").removeClass("body"); // Re-enable scroll after fade out
    });
  }, 0); 
});

