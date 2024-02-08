// Конфиг
export const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-5",
  headers: {
    authorization: "172894be-e17d-40e8-899f-2a9b2775f84e",
    "Content-Type": "application/json",
  },
};

// Забрать карточки
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

// Забрать инфо пользователя
export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка1: ${res.status}`);
  });
};

//Функция выгрузки новой карточки
export function appendNewСard(nameValue, linkValue) {
  return fetch("https://nomoreparties.co/v1/wff-cohort-5/cards", {
    method: "POST",
    headers: {
      authorization: "172894be-e17d-40e8-899f-2a9b2775f84e",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: nameValue,
      link: linkValue,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      console.log("error appendNewСard");
      return Promise.reject(`Error: ${res.status}`);
    }
  });
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
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка2: ${res.status}`);
  });
};

//Редактор аватара
export const updatingUserAvatar = (link) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: link.avatar,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка3: ${res.status}`);
  });
};

//Удалить карточку
export const delCard = (cardId) => {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-5/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка4: ${res.status}`);
  });
};

// Лайкнуть карточку
export const putLikeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка5: ${res.status}`);
  });
};
// Убрать лайк с карточки
export const unLikeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка6: ${res.status}`);
  });
};
