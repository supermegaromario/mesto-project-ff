import {
  popupCaption,
  popupImage,
  popupTypeImage,
  nameInput,
  jobInput,
  popupTypeEdit,
} from "../index.js";

//функция открытия попапа
export function openModal(event) {
  event.classList.add("popup_is-animated");
  setTimeout(() => {
    event.classList.add("popup_is-opened");
  }, 1);
  document.addEventListener("keydown", closeModalEsc);
  document.addEventListener("click", closeOverlay);
}

//функция закрытия попапа
export function closeModal(event) {
  event.classList.remove("popup_is-animated");
  setTimeout(() => {
    event.classList.remove("popup_is-opened");
  }, 1);
  document.removeEventListener("keydown", closeModalEsc);
  document.removeEventListener("click", closeOverlay);
}

export function closeModalEsc(event) {
  if (event.key === "Escape") {
    if (document.querySelector(".popup_is-opened")) {
      closeModal(document.querySelector(".popup_is-opened"));
    }
  }
}

export function closeOverlay(event) {
  if (event.target.classList.contains("popup_is-opened")) {
    closeModal(event.target);
  }
}

//функция большой картинки
export function openPopupImage(name, link) {
  popupCaption.textContent = name;
  popupImage.src = link;
  openModal(popupTypeImage);
}

//редактор формы профиля
export function handleFormSubmit(event) {
  event.preventDefault();
  document.querySelector(".profile__title").textContent = nameInput.value;
  document.querySelector(".profile__description").textContent = jobInput.value;
  closeModal(popupTypeEdit);
}
