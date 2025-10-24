const tabs = document.querySelectorAll(".tab");
const contents = document.querySelectorAll(".tab-content");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    contents.forEach(c => c.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById(tab.dataset.tab).classList.add("active");
  });
});

// Example mock data (later this will come from PHP/MySQL)
const books = [
  JSON.parse(localStorage.getItem("bookLibrary"))

];

function loadBooks() {
  books.forEach(book => {
    const card = `
      <div class="book-card">
        <img src="${book.cover}" alt="${book.title}">
        <div class="book-info">
          <h4>${book.title}</h4>
          <p>${book.author}</p>
          ${book.rating ? `<p class="rating">⭐ ${book.rating}</p>` : ""}
        </div>
      </div>
    `;
    document.getElementById(book.status).innerHTML += card;

    if (book.review) {
      document.getElementById("reviews").innerHTML += `
        <div class="book-card">
          <img src="${book.cover}" alt="${book.title}">
          <div class="book-info">
            <h4>${book.title}</h4>
            <p>⭐ ${book.rating}</p>
            <p>"${book.review}"</p>
          </div>
        </div>
      `;
    }
  });
}

loadBooks();




