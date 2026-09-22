export function createStars(rating) {
  const maxStars = 5;

  return "★".repeat(rating) + "☆".repeat(maxStars - rating);
}

export function createRatingForm(id) {
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

  return {
    ratingContainer,
    submitRating
  };
}