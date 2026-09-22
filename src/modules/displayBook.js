import { getBooks, updateBook, deleteBook } from "../firebase.js";
import { createStars, createRatingForm } from "./rating.js";
import { Book } from "./book.js";

export function displayBooks(books) {
  const toBeReadList = document.querySelector("#toBeRead-books");
  const readList = document.querySelector("#read-books");

  toBeReadList.innerHTML = "";
  readList.innerHTML = "";

  for (const id in books) {
    const bookData = books[id];

    const book = new Book(
      bookData.title,
      bookData.author,
      bookData.isRead,
      bookData.rating,
      bookData.expectationRating
    );

    const li = document.createElement("li");
    const title = document.createElement("h3");
    const author = document.createElement("p");
    const ratingInfo = document.createElement("p");
    const markAsRead = document.createElement("button");
    const deleteButton = document.createElement("button");
    const placeholderPicture = document.createElement("img");

placeholderPicture.src = "/images/book-placeholder.png";
placeholderPicture.alt = "Book cover placeholder";
placeholderPicture.classList.add("book-cover");

    title.textContent = book.title;
    author.textContent = `Author: ${book.author}`;

    if (book.isRead) {
      ratingInfo.textContent = createStars(book.rating);
      ratingInfo.classList.add("book-rating");
    } else {
      ratingInfo.textContent = createStars(book.expectationRating);
      ratingInfo.classList.add("book-rating", "expectation");
    }

    deleteButton.textContent = "×";

    deleteButton.addEventListener("click", async () => {
      await deleteBook(id);

      const books = await getBooks();
      displayBooks(books);
    });

    li.append(title, author, ratingInfo, deleteButton, placeholderPicture);

    markAsRead.textContent = "Mark as Read";

    markAsRead.addEventListener("click", () => {
      const { ratingContainer, submitRating } = createRatingForm(id);

      li.append(ratingContainer);

      submitRating.addEventListener("click", async () => {
        const selectedRating = ratingContainer.querySelector(
          'input[type="radio"]:checked'
        )?.value;

        if (!selectedRating) {
          return;
        }

        book.markAsRead(Number(selectedRating));

        const updatedBook = {
          isRead: book.isRead,
          rating: book.rating,
          expectationRating: book.expectationRating,
        };

        await updateBook(id, updatedBook);

        const books = await getBooks();
        displayBooks(books);
      });
    });

    if (book.isRead) {
      readList.append(li);
    } else {
      li.append(markAsRead);
      toBeReadList.append(li);
    }
  }
}