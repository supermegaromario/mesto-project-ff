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
    closeModal(document.querySelector(".popup_is-opened"));
  }
}

export function closeOverlay(event) {
  if (event.target.classList.contains("popup_is-opened")) {
    closeModal(event.target);
  }
}
