export class Book {
  #isRead;
  #rating;
  #expectationRating;

  constructor(title, author, isRead, rating, expectationRating) {
    this.title = title;
    this.author = author;
    this.#isRead = isRead;
    this.#rating = rating;
    this.#expectationRating = expectationRating;
  }

  get isRead() {
    return this.#isRead;
  }

  get rating() {
    return this.#rating;
  }

  get expectationRating() {
    return this.#expectationRating;
  }

  markAsRead(rating) {
    if (rating < 1 || rating > 5) {
      return;
    }

    this.#isRead = true;
    this.#rating = rating;
    this.#expectationRating = null;
  }

  toJSON() {
    return {
      title: this.title,
      author: this.author,
      isRead: this.#isRead,
      rating: this.#rating,
      expectationRating: this.#expectationRating,
    };
  }
}