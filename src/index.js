import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";
import { createCard, deleteCard, likeCard } from "./scripts/card.js";
import { openModal, closeModal } from "./scripts/modal.js";

// @todo: Темплейт карточки
export const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const cardsContainer = document.querySelector(".places__list"); //список карточек
const profileAddButton = document.querySelector(".profile__add-button"); //кнопка добавления карточки
const popupTypeNewCard = document.querySelector(".popup_type_new-card"); //попап добавления карточки
export const popupTypeEdit = document.querySelector(".popup_type_edit"); //попап редактирования профиля
const profileEditButton = document.querySelector(".profile__edit-button"); //кнопка редактирования профиля
const popupProfileEditClose = document.querySelector(".popup_type_edit .popup__close"); //кнопка крестик закрытия попапа редактирования профиля
const popupNewCardClose = document.querySelector(".popup_type_new-card .popup__close"); //кнопка крестик закрытия попапа новой карточки
const popupImageClose = document.querySelector(".popup_type_image .popup__close"); //кнопка крестик закрытия попапа картинки
export const popupTypeImage = document.querySelector('.popup_type_image');
export const popupImage = document.querySelector('.popup__image');
export const popupCaption = document.querySelector('.popup__caption');
const formProfileEditElement = document.querySelector('.popup_type_edit .popup__form');
export const nameInput = formProfileEditElement.querySelector('.popup__input_type_name');
export const jobInput = formProfileEditElement.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");


// @todo: Вывести карточки на страницу
initialCards.forEach((item) =>
  cardsContainer.append(
    createCard(item.name, item.link, deleteCard, likeCard, openPopupImage)
  )
);

//слушатель клика открытия попапа новой карточки
profileAddButton.addEventListener("click", function () {
  openModal(popupTypeNewCard);
});

//слушатель клика закрытия попапа новой карточки через кнопку крестик
popupNewCardClose.addEventListener("click", function () {
  closeModal(popupTypeNewCard);
});

//слушатель клика открытия попапа редактирования профиля
profileEditButton.addEventListener("click", function () {
  openModal(popupTypeEdit);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
});

//слушатель клика закрытия попапа редактирования профиля через кнопку крестик
popupProfileEditClose.addEventListener("click", function () {
  closeModal(popupTypeEdit);
});

//слушатель клика закрытия попапа картинки через кнопку крестик
popupImageClose.addEventListener("click", function () {
  closeModal(popupTypeImage);
});



//добавление новой карточки
const formNewPlace = document.querySelector('.popup_type_new-card .popup__form');
const cardNameInput = formNewPlace.querySelector('.popup__input_type_card-name');
const linkInput = formNewPlace.querySelector('.popup__input_type_url');
formNewPlace.addEventListener('submit', function (event) {
  event.preventDefault();
  const nameValue = cardNameInput.value;
  const linkValue = linkInput.value;
  const newPlaceCard = createCard(
    nameValue,
    linkValue,
    deleteCard,
    likeCard,
    openPopupImage
  );
  cardsContainer.prepend(newPlaceCard);
  formNewPlace.reset();
  closeModal(popupTypeNewCard);
});

//слушатель подтверждения профиля
formProfileEditElement.addEventListener('submit', handleEditProfileSubmit);

//функция большой картинки
function openPopupImage(name, link) {
  popupCaption.textContent = name;
  popupImage.src = link;
  popupImage.alt = name;
  openModal(popupTypeImage);
}

//редактор формы профиля
function handleEditProfileSubmit(event) {
  event.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(popupTypeEdit);
}
