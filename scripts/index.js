const profileEditButton = document.querySelector(".profile__edit");
const profileName = document.querySelector(".profile__name");
const profileAboutMe = document.querySelector(".profile__about-me");

const popup = document.querySelector(".popup");
const popupCloseButton = popup.querySelector(".popup__close");
const formElement = popup.querySelector(".popup__form");
const formName = formElement.querySelector(".popup__item_name");
const formAboutMe = formElement.querySelector(".popup__item_about-me");

const addCardButton = document.querySelector('.profile__add-card');

const popupImage = document.querySelector('.popup_image');
const popupImageCloseButton = popupImage.querySelector(".popup__close");
const popupFigureImage = popupImage.querySelector('.popup__image');
const popupCaption = popupImage.querySelector('.popup__caption');

const popupCard = document.querySelector(".popup_add-card");
const popupCardCloseButton = popupCard.querySelector(".popup__close");
const popupCardForm = popupCard.querySelector(".popup__form");
const popupCardFormName = popupCardForm.querySelector(".popup__item_name");
const popupCardFormLink = popupCardForm.querySelector(".popup__item_link");

const cardContainer = document.querySelector('.cards');

const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


function addCard(item) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.cloneNode(true);
  const cardLike = cardElement.querySelector('.card__like');
  const cardRemove = cardElement.querySelector('.card__remove');
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');

  cardTitle.textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;

  cardImage.addEventListener('click', openImageCard);
  cardLike.addEventListener('click', likeCard);
  cardRemove.addEventListener('click', removeCard)

  cardContainer.prepend(cardElement);
}

function openImageCard(evt) {
  popupFigureImage.src = evt.target.src;
  popupCaption.textContent = evt.target.alt;
  popupImageToggle();
}

function likeCard(evt) {
  evt.target.classList.toggle('card__like_active');
}

function removeCard(evt) {
  evt.target.parentNode.remove();

  if(!cardContainer.children.length) {
    const noCardTemplate = document.querySelector('#no-card-template').content;
    const noCardElement = noCardTemplate.cloneNode(true);

    cardContainer.append(noCardElement);
  }
}


// РЕДАКТИРОВАНИЕ ПРОФИЛЯ
function popupToggle() {
  popup.classList.toggle("popup_opened");

  if(popup.classList.contains("popup_opened")) {
    formName.value = profileName.textContent;
    formAboutMe.value = profileAboutMe.textContent;
  }
}

function formSubmitHandler (evt) {
  evt.preventDefault();

  profileName.textContent = formName.value;
  profileAboutMe.textContent = formAboutMe.value;

  popupToggle();
}


// ДОБАВЛЕНИЕ КАРТОЧКИ МЕСТА
function popupCardToggle() {
  popupCard.classList.toggle("popup_opened");
}

function cardFormSubmitHandler (evt) {
  evt.preventDefault();

  if(document.querySelector('.cards__no-card')) {
    document.querySelector('.cards__no-card').remove();
  }

  addCard({
    name: popupCardFormName.value,
    link: popupCardFormLink.value
  })
  popupCardToggle();

  popupCardFormName.value = '';
  popupCardFormLink.value = '';
}

// ДОБАВЛЕНИЕ КАРТОЧЕК
initialCards.forEach(addCard);

// ПОПАП ИЗОБРАЖЕНИЯ
function popupImageToggle() {
  popupImage.classList.toggle("popup_opened");
}

// ПРОФИЛЬ
profileEditButton.addEventListener('click', popupToggle);
popupCloseButton.addEventListener('click', popupToggle);
formElement.addEventListener('submit', formSubmitHandler);

// КАРТОЧКИ
addCardButton.addEventListener('click', popupCardToggle);
popupCardCloseButton.addEventListener('click', popupCardToggle);
popupCardForm.addEventListener('submit', cardFormSubmitHandler);

// ИЗОБРАЖЕНИЕ
popupImageCloseButton.addEventListener('click', popupImageToggle)

