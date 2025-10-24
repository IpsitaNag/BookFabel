let selectedBook = {};

function openAddMenu(title, author, cover) {
  selectedBook = { title, author, cover };
  document.getElementById("selectedBookTitle").innerText = title;
  document.getElementById("addMenu").style.display = "flex";
}

function closeMenu() {
  document.getElementById("addMenu").style.display = "none";
}

// For now use localStorage — later we can connect PHP/MySQL
function addBookToLibrary(status) {
  let library = JSON.parse(localStorage.getItem("bookLibrary")) || [];
  selectedBook.status = status;

  library.push(selectedBook);
  localStorage.setItem("bookLibrary", JSON.stringify(library));

  alert(`${selectedBook.title} added to ${status === 'tbr' ? 'Want to Read' : status === 'reading' ? 'Currently Reading' : 'Read'} list!`);
  
  closeMenu();
}
