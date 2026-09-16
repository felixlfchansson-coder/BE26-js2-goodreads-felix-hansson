// IMPORTS
import { Book } from "./book.js";
import { addBook, getBooks, updateBook, deleteBook } from "./firebase.js";
import { createIcons, icons } from "lucide";

createIcons({ icons });


// ==========================
// FORM
// ==========================

const bookForm = document.querySelector("#book-form");

// Hämta status-knapparna
const tbrRadio = document.querySelector("#status-tbr");
const readRadio = document.querySelector("#status-read");

// Hämta rating-sektionerna
const expectationRatingSection =
  document.querySelector("#expectation-rating");

const readRatingSection =
  document.querySelector("#read-rating");


// Visa rätt rating beroende på vald status
function updateRatingDisplay() {
  if (tbrRadio.checked) {
    expectationRatingSection.style.display = "block";
    readRatingSection.style.display = "none";
  } else {
    expectationRatingSection.style.display = "none";
    readRatingSection.style.display = "block";
  }
}


// Lyssna på ändring av status
tbrRadio.addEventListener("change", updateRatingDisplay);
readRadio.addEventListener("change", updateRatingDisplay);

// Kör direkt när sidan laddas
updateRatingDisplay();


// ==========================
// FORM SUBMIT
// ==========================

bookForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Hämta värden från formuläret
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isRead = document.querySelector("#status-read").checked;

  const selectedRating = document.querySelector(
    'input[name="rating"]:checked'
  )?.value;

  // Bestäm om stjärnorna är rating eller expectation rating
  const rating = isRead
    ? Number(selectedRating)
    : null;

  const expectationRating = isRead
    ? null
    : Number(selectedRating);

  // Skapa en ny bokinstans
  const book = new Book(
    title,
    author,
    isRead,
    rating,
    expectationRating
  );

  // Spara boken i Firebase
  await addBook(book);

  // Hämta böckerna igen
  const books = await getBooks();

  // Rita om listorna
  displayBooks(books);
});


// ==========================
// DISPLAY BOOKS
// ==========================

function displayBooks(books) {
  const tbrList = document.querySelector("#tbr-books");
  const readList = document.querySelector("#read-books");

  // Töm listorna innan de ritas om
  tbrList.innerHTML = "";
  readList.innerHTML = "";

  // Loopa igenom böckerna
  for (const id in books) {
    const book = books[id];

    // Skapa HTML-element för boken
    const li = document.createElement("li");
    const title = document.createElement("h3");
    const author = document.createElement("p");
    const ratingInfo = document.createElement("p");
    const markAsRead = document.createElement("button");
    const deleteButton = document.createElement("button");

    // Lägg in bokens information
    title.textContent = book.title;
    author.textContent = `Author: ${book.author}`;
    
function createStars(rating) {
  const maxStars = 5;

  return "★".repeat(rating) + "☆".repeat(maxStars - rating);
}
    // Visa rätt typ av rating
   if (book.isRead) {
      ratingInfo.textContent = createStars(book.rating);
      ratingInfo.classList.add("book-rating");
    } else {
      ratingInfo.textContent = createStars(book.expectationRating);
      ratingInfo.classList.add("book-rating", "expectation");
    }

    // Lägg till bokinformationen i li
    li.append(title, author, ratingInfo, deleteButton);
    // ==========================
    // DELETE BUTTON
    // ==========================
    deleteButton.textContent = "×";
    
    deleteButton.addEventListener("click", async () => {
      // Ta bort boken från Firebase
      await deleteBook(id);

      // Hämta böckerna igen
      const books = await getBooks();

      // Rita om listorna
      displayBooks(books);
    });

    // ==========================
    // MARK AS READ
    // ==========================

    markAsRead.textContent = "Mark as Read";

    markAsRead.addEventListener("click", () => {
      // Skapa container för rating
      const ratingContainer = document.createElement("div");

      // Frågan ovanför stjärnorna
      const ratingQuestion = document.createElement("p");
      ratingQuestion.textContent = "What did you think?";

      ratingContainer.append(ratingQuestion);


      // Skapa fem rating-alternativ
      for (let i = 1; i <= 5; i++) {
        const radio = document.createElement("input");

        radio.type = "radio";

        // Unik radio-grupp för just den här boken
        radio.name = `rating-${id}`;

        // Ratingvärde 1-5
        radio.value = i;

        // Unikt id
        radio.id = `rating-${id}-${i}`;

        // Skapa stjärnan
        const label = document.createElement("label");

        label.htmlFor = radio.id;
        label.textContent = "★";

        // Lägg till radio + stjärna
        ratingContainer.append(radio, label);
      }


      // Skapa knapp för att bekräfta rating
      const submitRating = document.createElement("button");

      submitRating.textContent = "Submit rating";

      ratingContainer.append(submitRating);

      // Visa rating-delen på just den här boken
      li.append(ratingContainer);


      // ==========================
      // SUBMIT RATING / UPDATE
      // ==========================

      submitRating.addEventListener("click", async () => {
        // Hämta vald rating från just den här boken
        const selectedRating = ratingContainer.querySelector(
          'input[type="radio"]:checked'
        )?.value;

        // Avbryt om ingen rating är vald
        if (!selectedRating) {
          return;
        }

        // Informationen som ska uppdateras
        const updatedBook = {
          isRead: true,
          rating: Number(selectedRating),
          expectationRating: null
        };

        // Uppdatera just den här boken i Firebase
        await updateBook(id, updatedBook);

        // Hämta böckerna igen
        const books = await getBooks();

        // Rita om listorna
        displayBooks(books);
      });
    });


    // ==========================
    // TBR / READ LIST
    // ==========================

    if (book.isRead) {
      // Lästa böcker behöver inte Mark as Read
      readList.append(li);
    } else {
      // TBR-böcker får Mark as Read-knappen
      li.append(markAsRead);

      tbrList.append(li);
    }
  }
}
// ==========================
// INITIAL LOAD
// ==========================

// Hämta böcker när sidan laddas
const books = await getBooks();

// Visa böckerna
displayBooks(books);