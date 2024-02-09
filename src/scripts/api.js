// Конфиг
export const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-5",
  headers: {
    authorization: "172894be-e17d-40e8-899f-2a9b2775f84e",
    "Content-Type": "application/json",
  },
};

// Проверка на ошибки
const checkError = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

// Забрать карточки
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(checkError);
};

// Забрать инфо пользователя
export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(checkError);
};

//Функция выгрузки новой карточки
export function appendNewСard(nameValue, linkValue) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: nameValue,
      link: linkValue,
    }),
  }).then(checkError);
}

// Редактор профиля
export const editProfile = (profile) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: profile.name,
      about: profile.about,
    }),
  }).then(checkError);
};

//Редактор аватара
export const updatingUserAvatar = (link) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: link.avatar,
    }),
  }).then(checkError);
};

//Удалить карточку
export const delCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkError);
};

// Лайкнуть карточку
export const putLikeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then(checkError);
};
// Убрать лайк с карточки
export const unLikeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkError);
};
