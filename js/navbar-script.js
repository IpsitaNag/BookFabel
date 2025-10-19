//dropdown toggle function

function toggleDropdown(event) {
  event.preventDefault(); // prevents link navigation
  const dropdown = event.target.closest('.dropdown');
  dropdown.classList.toggle('active');
}


// Login modal functionality for Library button
  let isLoggedIn = false;

  document.addEventListener("DOMContentLoaded", function() {
    const libraryBtn = document.getElementById("libraryBtn");
    const loginModal = document.getElementById("loginModal");

    libraryBtn.addEventListener("click", function(e) {
      e.preventDefault(); // prevent link jump
      if (!isLoggedIn) {
        loginModal.style.display = "block";
      } else {
        window.location.href = "library.html";
      }
    });
  });

  function closeModal() {
    document.getElementById("loginModal").style.display = "none";
  }


   // Toggle menu
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("navLinks");

    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });


     // Save the current page URL in the Join button
        const joinBtn = document.getElementById('joinBtn');
        joinBtn.href = `login.html?redirect=${encodeURIComponent(window.location.pathname)}`;
