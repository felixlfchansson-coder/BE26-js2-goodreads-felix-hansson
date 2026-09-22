export class Book {
  #rating;

  constructor(title, author, isRead, rating, expectationRating) {
    this.title = title;
    this.author = author;
    this.isRead = isRead;
    this.#rating = rating;
    this.expectationRating = expectationRating;
  }

  get rating() {
    return this.#rating;
  }

  markAsRead(rating) {
    if (rating >= 1 && rating <= 5) {
      this.isRead = true;
      this.#rating = rating;
      this.expectationRating = null;
    }
  }
}