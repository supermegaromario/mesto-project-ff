import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";
import { createCard, deleteCard, likeCard } from "./scripts/card.js";
import { openModal, closeModal } from "./scripts/modal.js";
import { enableValidation } from "./scripts/validation.js";
import {
  getInitialCards,
  getUserInfo,
  updatingUserAvatar,
  editProfile,
  appendNewСard,
} from "./scripts/api.js";

// @todo: Темплейт карточки
export const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const cardsContainer = document.querySelector(".places__list"); //список карточек
const profileAddButton = document.querySelector(".profile__add-button"); //кнопка добавления карточки
const popupTypeNewCard = document.querySelector(".popup_type_new-card"); //попап добавления карточки
export const popupTypeEdit = document.querySelector(".popup_type_edit"); //попап редактирования профиля
const profileEditButton = document.querySelector(".profile__edit-button"); //кнопка редактирования профиля
const popupProfileEditClose = document.querySelector(
  ".popup_type_edit .popup__close"
); //кнопка крестик закрытия попапа редактирования профиля
const popupNewCardClose = document.querySelector(
  ".popup_type_new-card .popup__close"
); //кнопка крестик закрытия попапа новой карточки
const popupImageClose = document.querySelector(
  ".popup_type_image .popup__close"
); //кнопка крестик закрытия попапа картинки
export const popupTypeImage = document.querySelector(".popup_type_image");
export const popupImage = document.querySelector(".popup__image");
export const popupCaption = document.querySelector(".popup__caption");
const formProfileEditElement = document.querySelector(
  ".popup_type_edit .popup__form"
);
export const nameInput = formProfileEditElement.querySelector(
  ".popup__input_type_name"
);
export const jobInput = formProfileEditElement.querySelector(
  ".popup__input_type_description"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const formElement = document.querySelector(".popup__form");
const inputElement = formElement.querySelector(".popup__input");
const avatarInput = document.querySelector(".popup__input_type_avatar");
const avatarEditButton = document.querySelector(".profile__image");
const popupAvatarEdit = document.querySelector(".popup_avatar_edit");
const popupAvatarClose = document.querySelector(
  ".popup_avatar_edit .popup__close"
); //кнопка крестик закрытия попапа редактирования аватара

//слушатель клика открытия попапа редактирования аватара
avatarEditButton.addEventListener("click", function () {
  openModal(popupAvatarEdit);
});

//слушатель клика закрытия попапа редактирования аватара через кнопку крестик
popupAvatarClose.addEventListener("click", function () {
  closeModal(popupAvatarEdit);
});

//слушатель клика открытия попапа новой карточки
profileAddButton.addEventListener("click", function () {
  cardNameInput.value = "";
  linkInput.value = "";
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
const formNewPlace = document.querySelector(
  ".popup_type_new-card .popup__form"
);
const cardNameInput = formNewPlace.querySelector(
  ".popup__input_type_card-name"
);
const linkInput = formNewPlace.querySelector(".popup__input_type_url");
formNewPlace.addEventListener("submit", function (event) {
  event.preventDefault();
  const nameValue = cardNameInput.value;
  const linkValue = linkInput.value;
  appendNewСard(nameValue, linkValue).then((card) => {
    const newPlaceCard = createCard(
      card.name,
      card.link,
      deleteCard,
      openPopupImage,
      likeCard,
      card.likes,
      card._id,
      card.owner._id,
      userID
    );
    cardsContainer.prepend(newPlaceCard);
  });
  formNewPlace.reset();
  closeModal(popupTypeNewCard);
});

//слушатель подтверждения профиля
formProfileEditElement.addEventListener("submit", handleEditProfileSubmit);

//функция большой картинки
function openPopupImage(name, link) {
  popupCaption.textContent = name;
  popupImage.src = link;
  popupImage.alt = name;
  openModal(popupTypeImage);
}

//Вызов функции валидации
enableValidation();

const profileAvatarImage = document.querySelector(".profile__image");

//Функция редактирования аватарки
function handleFormImageSubmit(evt) {
  evt.preventDefault();
  const link = {
    avatar: avatarInput.value,
  };
  updatingUserAvatar(link)
    .then((link) => {
      profileAvatarImage.style.backgroundImage = `url(${link.avatar})`;
      closeModal(popupAvatarEdit);
    })
    .catch((err) => {
      console.log(err);
    });
}

const formAvatarEdit = document.querySelector(
  ".popup_avatar_edit .popup__form"
);
//Слушатель подтверждения аватара
formAvatarEdit.addEventListener("submit", handleFormImageSubmit);

//Функция редактирования профиля
function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  const data = {
    name: nameInput.value,
    about: jobInput.value,
  };
  editProfile(data)
    .then(() => {
      profileTitle.textContent = nameInput.value;
      profileDescription.textContent = jobInput.value;
      closeModal(popupTypeEdit);
    })
    .catch((err) => {
      console.log(err);
    });
}

let userID;

const promises = [getUserInfo(), getInitialCards()];
Promise.all(promises)
  .then(([user, cards]) => {
    profileAvatarImage.style.backgroundImage = `url(${user.avatar})`;
    profileTitle.textContent = user.name;
    profileDescription.textContent = user.about;
    userID = user._id;
    cards.forEach((card) => {
      cardsContainer.append(
        createCard(
          card.name,
          card.link,
          deleteCard,
          openPopupImage,
          likeCard,
          card.likes,
          card._id,
          card.owner._id,
          user._id
        )
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });
