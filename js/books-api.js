const resultsDiv = document.getElementById("results");
const searchResults = document.getElementById("searchResults");

// Function to get the best available cover image
function getBookCover(book) {
  if (book.imageLinks) {
    return (
      book.imageLinks.extraLarge?.replace("http:", "https:") ||
      book.imageLinks.large?.replace("http:", "https:") ||
      book.imageLinks.medium?.replace("http:", "https:") ||
      book.imageLinks.thumbnail?.replace("http:", "https:") ||
      book.imageLinks.smallThumbnail?.replace("http:", "https:")
    );
  }
  // Fallback placeholder
  return "https://via.placeholder.com/200x300?text=No+Cover";
}


// Search books
async function searchBooks() {
  const query = document.getElementById("searchInput").value.trim();
  if (!query) return;

  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=20`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch data");
    const data = await res.json();

    searchResults.style.display = "block";

    if (!data.items || data.items.length === 0) {
      resultsDiv.innerHTML = "<p>No results found.</p>";
      return;
    }

    displaySearchResults(data.items);
  } catch (err) {
    console.error("Error fetching books:", err);
    resultsDiv.innerHTML = "<p>Something went wrong. Please try again later.</p>";
  }

}

// Display grid of books
function displaySearchResults(items) {
  resultsDiv.innerHTML = `
    <div class="book-grid">
      ${items
      .map((item, index) => {
        const book = item.volumeInfo;
        const cover = getBookCover(book);
        const title = book.title || "No Title";
        const authors = book.authors ? book.authors.join(", ") : "Unknown Author";

        return `
            <div class="book-card" data-index="${index}">
              <img src="${cover}" alt="${title}" loading="lazy">
              <div class="book-info">
                <h4>${title}</h4>
                <p>${authors}</p>
              </div>
            </div>
          `;
      })
      .join("")}
    </div>
  `;

  document.querySelectorAll(".book-card").forEach((card, index) => {
    card.addEventListener("click", () => showBookDetails(items[index], items));
  });
}

// Show detailed info of clicked book
function showBookDetails(item, allItems) {
  const book = item.volumeInfo;
  const cover = getBookCover(book);
  const title = book.title || "No Title";
  const authors = book.authors ? book.authors.join(", ") : "Unknown Author";
  const publisher = book.publisher || "Unknown Publisher";
  const publishedDate = book.publishedDate || "N/A";
  const pages = book.pageCount ? `${book.pageCount} pages` : "Page count N/A";
  const previewLink = book.previewLink || "#";

  // Rating / Reviews
  const rating = book.averageRating
    ? `${book.averageRating} ⭐ (${book.ratingsCount || 0} reviews)`
    : "No reviews";

  // Story / Description
  const fullDescription = book.description || "No description available.";
  const shortDescription = fullDescription.length > 300
    ? fullDescription.substring(0, 300) + "..."
    : fullDescription;


  resultsDiv.innerHTML = `
    <div class="detailed-card warm">
      <img src="${cover}" alt="${title}">
      <div class="details">
        <h2>${title}</h2>
        <h4>${authors}</h4>
        <p><strong>Publisher:</strong> ${publisher}</p>
        <p><strong>Published:</strong> ${publishedDate}</p>
        <p><strong>Pages:</strong> ${pages}</p>


        <!-- Ratings separate -->
        <p class="reviews"><strong>Rating & Reviews:</strong> ${rating}</p>


        <!-- Story / Description -->
        <p class="desc" id="bookDesc">${shortDescription} ${fullDescription.length > 300 ? '<span id="toggleDesc" style="color: blue; cursor: pointer;">Read More</span>' : ''}</p>

        <div class="btn-group">
          <button class="add-to-library btn-blue" onclick="openAddMenu('${title}', '${authors}', '${cover}')">Add to Library</button>
          <a href="${previewLink}" target="_blank" class="btn-preview">Preview</a>
        </div>
        <br>
        <button class="btn-back" id="backBtn">← Back to Results</button>
      </div>
    </div>
  `;

  // Toggle Read More / Show Less for description only
  const toggleBtn = document.getElementById("toggleDesc");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const descElem = document.getElementById("bookDesc");
      if (toggleBtn.textContent === "Read More") {
        descElem.textContent = fullDescription + ' ';
        toggleBtn.textContent = "Show Less";
        descElem.appendChild(toggleBtn); // reattach toggle span
      } else {
        descElem.textContent = shortDescription + ' ';
        toggleBtn.textContent = "Read More";
        descElem.appendChild(toggleBtn); // reattach toggle span
      }
    });
  }

  // Back button
  document.getElementById("backBtn").addEventListener("click", () => {
    displaySearchResults(allItems);
  });
}





// Press Enter to search
document.getElementById("searchInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    searchBooks();
  }
});

function openAddMenu(title, author, cover) {
  // Ask user where to add the book
  const choice = prompt(`Where do you want to add "${title}"?\n1️⃣ Currently Reading\n2️⃣ To Be Read (TBR)\n3️⃣ Read\n\nEnter the number:`);

  let category = "";
  if (choice === "1") category = "reading";
  else if (choice === "2") category = "tbr";
  else if (choice === "3") category = "read";
  else {
    alert("Invalid choice!");
    return;
  }

  // Prepare the book object
  const book = { title, author, cover };

  // Retrieve library from localStorage or initialize
  const library = JSON.parse(localStorage.getItem("library")) || { reading: [], tbr: [], read: [] };

  // Prevent duplicates
  if (library[category].some(b => b.title === title)) {
    alert("This book is already in that section!");
    return;
  }

  // Add to the selected list
  library[category].push(book);
  localStorage.setItem("library", JSON.stringify(library));

  alert(`✅ "${title}" added to your ${category === "tbr" ? "TBR" : category === "reading" ? "Currently Reading" : "Read"} list!`);
}


