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

  toBeReadRadio.addEventListener("change", updateRatingDisplay);
  readRadio.addEventListener("change", updateRatingDisplay);

  updateRatingDisplay();

  bookForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const isRead = readRadio.checked;

    const selectedRating = document.querySelector(
      'input[name="rating"]:checked'
    )?.value;

    const rating = isRead
      ? Number(selectedRating)
      : null;

    const expectationRating = isRead
      ? null
      : Number(selectedRating);

    const book = new Book(
      title,
      author,
      isRead,
      rating,
      expectationRating
    );

    await addBook(book);

    const books = await getBooks();
    displayBooks(books);
  });
}