//dropdown toggle function

function toggleDropdown(event) {
  event.preventDefault(); // prevents link navigation
  const dropdown = event.target.closest('.dropdown');
  dropdown.classList.toggle('active');
}
