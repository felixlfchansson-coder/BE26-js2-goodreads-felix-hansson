import { getBooks, updateBook, deleteBook } from "../firebase.js";
import { createStars, createRatingForm } from "./rating.js";
import { Book } from "./book.js";
import { getBookCover } from "./openLibrary.js";


export function displayBooks(books) {
  const toBeReadList = document.querySelector("#toBeRead-books");
  const readList = document.querySelector("#read-books");

  clearLists(toBeReadList, readList);

  for (const id in books) {
    const book = createBook(books[id]);
    const bookElement = createBookElement(id, book);

    if (book.isRead) {
      readList.append(bookElement);
    } else {
      toBeReadList.append(bookElement);
    }
  }
}


function clearLists(toBeReadList, readList) {
  toBeReadList.innerHTML = "";
  readList.innerHTML = "";
}


function createBook(bookData) {
  return new Book(
    bookData.title,
    bookData.author,
    bookData.isRead,
    bookData.rating,
    bookData.expectationRating
  );
}

async function setBookCover(image, book) {
  const coverUrl = await getBookCover(
    book.title,
    book.author
  );

  image.src = coverUrl ?? "/images/book-placeholder.png";
}

function createBookElement(id, book) {
  const li = document.createElement("li");
  const title = document.createElement("h3");
  const author = document.createElement("p");
  const ratingInfo = document.createElement("p");
  const deleteButton = document.createElement("button");
  const placeholderPicture = document.createElement("img");

  title.textContent = book.title;
  author.textContent = `Author: ${book.author}`;

placeholderPicture.alt = `Cover of ${book.title}`;
placeholderPicture.classList.add("book-cover");

setBookCover(placeholderPicture, book);

  setRatingInfo(ratingInfo, book);

  deleteButton.textContent = "×";
  deleteButton.addEventListener("click", () => handleDelete(id));

  li.append(
    title,
    author,
    ratingInfo,
    deleteButton,
    placeholderPicture
  );

  if (!book.isRead) {
    const markAsReadButton = createMarkAsReadButton(id, book, li);
    li.append(markAsReadButton);
  }

  return li;
}


function setRatingInfo(ratingInfo, book) {
  ratingInfo.classList.add("book-rating");

  if (book.isRead) {
    ratingInfo.textContent = createStars(book.rating);
  } else {
    ratingInfo.textContent = createStars(book.expectationRating);
    ratingInfo.classList.add("expectation");
  }
}


function createMarkAsReadButton(id, book, li) {
  const markAsReadButton = document.createElement("button");

  markAsReadButton.textContent = "Mark as Read";

  markAsReadButton.addEventListener("click", () => {
    const { ratingContainer, submitRating } = createRatingForm(id);

    li.append(ratingContainer);

    submitRating.addEventListener("click", async () => {
      const selectedRating = ratingContainer.querySelector(
        'input[type="radio"]:checked'
      )?.value;

      if (!selectedRating) {
        return;
      }

      await handleMarkAsRead(id, book, Number(selectedRating));
    });
  });

  return markAsReadButton;
}


async function handleMarkAsRead(id, book, rating) {
  book.markAsRead(rating);

  const updatedBook = {
    isRead: book.isRead,
    rating: book.rating,
    expectationRating: book.expectationRating,
  };

  await updateBook(id, updatedBook);
  await refreshBooks();
}


async function handleDelete(id) {
  await deleteBook(id);
  await refreshBooks();
}


async function refreshBooks() {
  const books = await getBooks();
  displayBooks(books);
}