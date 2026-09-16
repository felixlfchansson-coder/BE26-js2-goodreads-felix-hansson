const BASE_URL = "https://goodreadbe26-js2-fh-default-rtdb.europe-west1.firebasedatabase.app/";

// Post här
export async function addBook(book) {
  const response = await fetch(`${BASE_URL}books.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  });
  const data = await response.json();
  return data;
}

// Get här
export async function getBooks() {
  const response = await fetch(`${BASE_URL}books.json`);
  const data = await response.json();
  return data;
}

//updatera med patch
export async function updateBook(id, updatedBook) {
  const response = await fetch(`${BASE_URL}books/${id}.json`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedBook),
  });
  const data = await response.json();
  return data;
}

// Delete här
export async function deleteBook(id) {
  const response = await fetch(`${BASE_URL}books/${id}.json`, {
    method: "DELETE",
  });
  const data = await response.json();
  return data;
}