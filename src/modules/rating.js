export function createStars(rating) {
  const maxStars = 5;

  return "★".repeat(rating) + "☆".repeat(maxStars - rating);
}

export function createRatingForm(id) {
  const ratingContainer = document.createElement("div");
  const ratingQuestion = document.createElement("p");
  const ratingOptions = document.createElement("div");
  const submitRating = document.createElement("button");

  ratingContainer.classList.add("book-rating-form");
  ratingOptions.classList.add("book-rating-options");
  submitRating.classList.add("submit-rating");

  ratingQuestion.textContent = "What did you think?";
  submitRating.textContent = "Submit rating";

  for (let rating = 1; rating <= 5; rating++) {
    const { radio, label } = createRatingOption(id, rating);
    ratingOptions.append(radio, label);
  }

  ratingContainer.append(
    ratingQuestion,
    ratingOptions,
    submitRating
  );

  return {
    ratingContainer,
    submitRating,
  };
}

function createRatingOption(id, rating) {
  const radio = document.createElement("input");
  const label = document.createElement("label");

  radio.type = "radio";
  radio.name = `rating-${id}`;
  radio.value = rating;
  radio.id = `rating-${id}-${rating}`;

  label.htmlFor = radio.id;
  label.textContent = "★";

  return {
    radio,
    label,
  };
}