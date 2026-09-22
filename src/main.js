import { getBooks } from "./firebase.js";

import { displayBooks } from "./modules/displayBook.js";

import { initNewBook } from "./modules/newBook.js";

import { createIcons, icons } from "lucide";

createIcons({ icons });

// Starta formuläret
initNewBook();

// Hämta böcker från Firebase
const books = await getBooks();

// Visa böckerna
displayBooks(books);