// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(name, link, deleteCard) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const imageElement = cardElement.querySelector(".card__image");
  imageElement.src = link;
  cardElement.querySelector(".card__title").textContent = name;
  imageElement.alt = name;
  deleteButton.addEventListener("click", deleteCard);
  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(event) {
  const listElement = event.target.closest(".card");
  listElement.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((item) =>
  placesList.append(createCard(item.name, item.link, deleteCard))
);
