import { cardTemplate } from "../index.js";

// @todo: Функция создания карточки
export function createCard(name, link, deleteCard, likeCard, openPopupImage) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const imageElement = cardElement.querySelector(".card__image");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  imageElement.src = link;
  cardElement.querySelector(".card__title").textContent = name;
  imageElement.alt = name;
  imageElement.addEventListener("click", function () {
    openPopupImage(name, link);
  });
  deleteButton.addEventListener("click", deleteCard);
  cardLikeButton.addEventListener("click", likeCard);

  return cardElement;
}

// @todo: Функция удаления карточки
export function deleteCard(event) {
  const listElement = event.target.closest(".card");
  listElement.remove();
}

//лайк в карточке
export function clickCard(event) {
  if (event.target.classList.contains("card__like-button")) {
    likeCard(event);
  }
}

export function likeCard(event) {
  event.target.classList.toggle("card__like-button_is-active");
}
