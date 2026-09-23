import { Book } from "./book.js";
import { addBook, getBooks } from "../firebase.js";
import { displayBooks } from "./displayBook.js";

export function initNewBook() {
  const bookForm = document.querySelector("#book-form");
  const toBeReadRadio = document.querySelector("#status-toBeRead");
  const readRadio = document.querySelector("#status-read");

  const expectationRatingSection =
    document.querySelector("#expectation-rating");

  const readRatingSection =
    document.querySelector("#read-rating");

  function updateRatingDisplay() {
    if (toBeReadRadio.checked) {
      expectationRatingSection.style.display = "block";
      readRatingSection.style.display = "none";
    } else {
      expectationRatingSection.style.display = "none";
      readRatingSection.style.display = "block";
    }
  }
  
   async function handleBookSubmit(event) {
    event.preventDefault();

    const book = createBookFromForm();

    await addBook(book);

    bookForm.reset();
    updateRatingDisplay();

    const books = await getBooks();
    displayBooks(books);
  }

  toBeReadRadio.addEventListener("change", updateRatingDisplay);
  readRadio.addEventListener("change", updateRatingDisplay);

  bookForm.addEventListener("submit", handleBookSubmit);

  updateRatingDisplay();
}


function createBookFromForm() {
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isRead = document.querySelector("#status-read").checked;

  const selectedRating = isRead
    ? document.querySelector('input[name="read-rating"]:checked')?.value
    : document.querySelector('input[name="expectation-rating"]:checked')?.value;

  const rating = isRead
    ? Number(selectedRating)
    : null;

  const expectationRating = isRead
    ? null
    : Number(selectedRating);

  return new Book(
    title,
    author,
    isRead,
    rating,
    expectationRating
  );
}