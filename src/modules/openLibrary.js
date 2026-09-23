export async function getBookCover(title, author) {
  const params = new URLSearchParams({
    title: title,
    author: author,
    limit: 1,
  });

  const response = await fetch(
    `https://openlibrary.org/search.json?${params}`
  );

  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  const book = data.docs[0];

  if (!book?.cover_i) {
    return null;
  }

  return `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
}