document.addEventListener("DOMContentLoaded", () => {
  const suggestions = [
    {
      title: "The Silent Patient",
      author: "Alex Michaelides",
      cover: "https://covers.openlibrary.org/b/id/10554096-L.jpg"
    },
    {
      title: "The Housemaid's Secret",
      author: "Freida McFadden",
      cover: "https://covers.openlibrary.org/b/id/10981616-L.jpg"
    },
    {
      title: "Bright",
      author: "Jessica Jung",
      cover: "https://covers.openlibrary.org/b/id/10585673-L.jpg"
    },
    {
      title: "Harry Potter and the Philosopher's Stone",
      author: "J.K. Rowling",
      cover: "https://covers.openlibrary.org/b/id/7984916-L.jpg"
    }
    // Add more books here
  ];

  const loggedUser = localStorage.getItem("loggedInUser");
  const suggestionsGrid = document.getElementById("suggestionsGrid");

  if (!loggedUser) {
    suggestionsGrid.innerHTML = "<p style='text-align:center;'>Please log in to see book suggestions.</p>";
    return;
  }

  suggestionsGrid.innerHTML = suggestions.map(book => `
    <div class="book-card">
      <img src="${book.cover}" alt="${book.title}">
      <h4>${book.title}</h4>
      <p>${book.author}</p>
      <button onclick="addSuggestedBook('${book.title}', '${book.author}', '${book.cover}')">Add to Library</button>
    </div>
  `).join("");
});

// Function to add suggested book to library
function addSuggestedBook(title, author, cover) {
  const loggedUser = localStorage.getItem("loggedInUser");
  if (!loggedUser) {
    alert("Please log in first!");
    return;
  }

  const allLibraries = JSON.parse(localStorage.getItem("userLibraries")) || {};
  const library = allLibraries[loggedUser] || { reading: [], tbr: [], read: [] };

  // Default: add to TBR
  if (library.tbr.some(b => b.title === title)) {
    alert("This book is already in your TBR!");
    return;
  }

  library.tbr.push({ title, author, cover });
  allLibraries[loggedUser] = library;
  localStorage.setItem("userLibraries", JSON.stringify(allLibraries));

  alert(`✅ "${title}" added to your TBR!`);
}
