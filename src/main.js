// IMPORTS
import { Book } from "./book.js";
import { addBook, getBooks, updateBook, deleteBook } from "./firebase.js";
import { createIcons, icons } from "lucide";

createIcons({ icons });



const bookForm = document.querySelector("#book-form");
const tbrRadio = document.querySelector("#status-tbr");
const readRadio = document.querySelector("#status-read");
const expectationRatingSection = document.querySelector("#expectation-rating");
const readRatingSection = document.querySelector("#read-rating");


function updateRatingDisplay() {
  if (tbrRadio.checked) {
    expectationRatingSection.style.display = "block";
    readRatingSection.style.display = "none";
  } else {
    expectationRatingSection.style.display = "none";
    readRatingSection.style.display = "block";
  }
}

tbrRadio.addEventListener("change", updateRatingDisplay);
readRadio.addEventListener("change", updateRatingDisplay);

updateRatingDisplay();


bookForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isRead = document.querySelector("#status-read").checked;
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

function displayBooks(books) {
  const tbrList = document.querySelector("#tbr-books");
  const readList = document.querySelector("#read-books");

  tbrList.innerHTML = "";
  readList.innerHTML = "";

  for (const id in books) {
    const book = books[id];
    const li = document.createElement("li");
    const title = document.createElement("h3");
    const author = document.createElement("p");
    const ratingInfo = document.createElement("p");
    const markAsRead = document.createElement("button");
    const deleteButton = document.createElement("button");

    title.textContent = book.title;
    author.textContent = `Author: ${book.author}`;
    
function createStars(rating) {
  const maxStars = 5;

  return "★".repeat(rating) + "☆".repeat(maxStars - rating);
}
   if (book.isRead) {
      ratingInfo.textContent = createStars(book.rating);
      ratingInfo.classList.add("book-rating");
    } else {
      ratingInfo.textContent = createStars(book.expectationRating);
      ratingInfo.classList.add("book-rating", "expectation");
    }

    li.append(title, author, ratingInfo, deleteButton);

    deleteButton.textContent = "×";
    deleteButton.addEventListener("click", async () => {
    await deleteBook(id);
    const books = await getBooks();
    displayBooks(books);
    });

    markAsRead.textContent = "Mark as Read";
    markAsRead.addEventListener("click", () => {
      const ratingContainer = document.createElement("div");
      const ratingQuestion = document.createElement("p");
      ratingQuestion.textContent = "What did you think?";
      ratingContainer.append(ratingQuestion);
      for (let i = 1; i <= 5; i++) {
        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = `rating-${id}`;
        radio.value = i;
        radio.id = `rating-${id}-${i}`;
        const label = document.createElement("label");
        label.htmlFor = radio.id;
        label.textContent = "★";
        ratingContainer.append(radio, label);
      }

      const submitRating = document.createElement("button");
      submitRating.textContent = "Submit rating";
      ratingContainer.append(submitRating);
      li.append(ratingContainer);

      submitRating.addEventListener("click", async () => {
        const selectedRating = ratingContainer.querySelector(
          'input[type="radio"]:checked'
        )?.value;
        if (!selectedRating) {
          return;
        }

        const updatedBook = {
          isRead: true,
          rating: Number(selectedRating),
          expectationRating: null
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
      tbrList.append(li);
    }
  }
}

const books = await getBooks();
displayBooks(books);