document.addEventListener("DOMContentLoaded", () => {
  const loggedUser = localStorage.getItem("loggedInUser");
  if (!loggedUser) {
    alert("Please log in first!");
    window.location.href = "index.html";
    return;
  }

  const allLibraries = JSON.parse(localStorage.getItem("userLibraries")) || {};
  const library = allLibraries[loggedUser] || { reading: [], tbr: [], read: [] };

  // Update username/email (mock example)
  document.getElementById("username").textContent = loggedUser;
  document.getElementById("email").textContent = loggedUser + "@bookfabel.com";

  // Update stats
  document.getElementById("readCount").textContent = library.read.length;
  document.getElementById("readingCount").textContent = library.reading.length;
  document.getElementById("tbrCount").textContent = library.tbr.length;

  // Edit Profile Button (placeholder)
  document.getElementById("editProfileBtn").addEventListener("click", () => {
    alert("Edit profile functionality coming soon!");
  });

  // Logout
  const logoutBtn = document.getElementById("logoutBtn");
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
  });
});
