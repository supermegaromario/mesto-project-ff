import { delCard, putLikeCard, unLikeCard } from "./api.js";

// @todo: Темплейт карточки
export const cardTemplate = document.querySelector("#card-template").content;

// @todo: Функция создания карточки
export function createCard(
  name,
  link,
  deleteCard,
  openPopupImage,
  like,
  cardLike,
  cardId,
  cardOwnerId,
  userId
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const imageElement = cardElement.querySelector(".card__image");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardLikeCounter = cardElement.querySelector(".card__like-counter");
  cardLikeCounter.textContent = cardLike.length;
  imageElement.src = link;
  cardElement.querySelector(".card__title").textContent = name;
  imageElement.alt = name;
  if (userId === cardOwnerId) {
    deleteButton.classList.remove("card__delete-button-hidden");
    deleteButton.addEventListener("click", function () {
      deleteCard(cardElement, cardId);
    });
  } else {
    deleteButton.classList.add("card__delete-button-hidden");
  }
  imageElement.addEventListener("click", function () {
    openPopupImage(name, link);
  });
  cardLikeButton.addEventListener("click", () => {
    like(cardId, cardLikeButton, cardLikeCounter);
  });

  cardLike.forEach((element) => {
    if (element._id === userId) {
      cardLikeButton.classList.add("card__like-button_is-active");
    }
  });

  return cardElement;
}

// @todo: Функция удаления карточки
export function deleteCard(card, cardId) {
  delCard(cardId)
    .then(() => {
      const listElement = card.closest(".card");
      listElement.remove();
    })
    .catch((err) => {
      console.log(err);
    });
}

//функция лайка карточки
export function likeCard(cardId, cardLikeButton, cardLikeCounter) {
  if (!cardLikeButton.classList.contains("card__like-button_is-active")) {
    putLikeCard(cardId)
      .then((res) => {
        cardLikeButton.classList.add("card__like-button_is-active");
        cardLikeCounter.textContent = Object.keys(res.likes).length;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    unLikeCard(cardId)
      .then((res) => {
        cardLikeButton.classList.remove("card__like-button_is-active");
        cardLikeCounter.textContent = Object.keys(res.likes).length;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
