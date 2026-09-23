import { getBooks } from "./firebase.js";

import { displayBooks } from "./modules/displayBook.js";

import { initNewBook } from "./modules/newBook.js";

import { createIcons, icons } from "lucide";

createIcons({ icons });


initNewBook();


const books = await getBooks();


displayBooks(books);