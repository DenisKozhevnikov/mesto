import { initialCards } from "./initialCards.js";

const profileEditButton = document.querySelector(".profile__edit");
const profileName = document.querySelector(".profile__name");
const profileAboutMe = document.querySelector(".profile__about-me");

const popups = document.querySelectorAll('.popup');

const popupProfile = document.querySelector(".popup_profile");
const popupProfileForm = popupProfile.querySelector(".popup__form");
const popupProfileName = popupProfileForm.querySelector(".popup__item_name");
const popupProfileAboutMe = popupProfileForm.querySelector(".popup__item_about-me");

const addCardButton = document.querySelector('.profile__add-card');

const popupImage = document.querySelector('.popup_image');
const popupFigureImage = popupImage.querySelector('.popup__image');
const popupCaption = popupImage.querySelector('.popup__caption');

const popupCard = document.querySelector(".popup_add-card");
const popupCardForm = popupCard.querySelector(".popup__form");
const popupCardFormName = popupCardForm.querySelector(".popup__item_name");
const popupCardFormLink = popupCardForm.querySelector(".popup__item_link");

const cardContainer = document.querySelector('.cards');

const popupCloseButtons = document.querySelectorAll(".popup__close");

// Показать/закрыть всплывающее окно
function popupToggle(popup) {
  if(popup) {
    popup.classList.toggle("popup_opened");
  } else {
    popups.forEach((el) => {
      if(el.classList.contains('popup_opened')) {
        el.classList.toggle('popup_opened');
      }
    })
  }
}

//  Добавление карточки
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
  cardRemove.addEventListener('click', removeCard);

  cardContainer.prepend(cardElement);
}

// Попап изображения
function openImageCard(evt) {
  popupFigureImage.src = evt.target.src;
  popupCaption.textContent = evt.target.alt;
  popupToggle(popupImage);
}

// Переключатель лайка у карточки
function likeCard(evt) {
  evt.target.classList.toggle('card__like_active');
}

// Удаление карточки
function removeCard(evt) {
  evt.target.closest('.card').remove();

  if(!cardContainer.children.length) {
    const noCardTemplate = document.querySelector('#no-card-template').content;
    const noCardElement = noCardTemplate.cloneNode(true);

    cardContainer.append(noCardElement);
  }
}

// Форма редактирования профиля
function formSubmitHandler (evt) {
  evt.preventDefault();

  profileName.textContent = popupProfileName.value;
  profileAboutMe.textContent = popupProfileAboutMe.value;

  popupToggle();
}

// Форма добавления карточки
function cardFormSubmitHandler (evt) {
  evt.preventDefault();
  const cardsNoCard = document.querySelector('.cards__no-card');

  if(cardsNoCard) {
    cardsNoCard.remove();
  }

  addCard({
    name: popupCardFormName.value,
    link: popupCardFormLink.value
  });

  popupToggle();

  evt.target.reset();
}

// Добавление карточек из массива
initialCards.forEach(addCard);

// Слушатель кнопки редактирования профиля
profileEditButton.addEventListener('click', () => {
  popupToggle(popupProfile);
  if(popupProfile.classList.contains("popup_opened")) {
    popupProfileName.value = profileName.textContent;
    popupProfileAboutMe.value = profileAboutMe.textContent;
  }
})

addCardButton.addEventListener('click', () => {
  popupToggle(popupCard);
})


// Слушатель кнопок закрытия всплывающих окон
popupCloseButtons.forEach((el) => {
  el.addEventListener('click', () => popupToggle());
})

// Закрытие попапа по клику на оверлей
popups.forEach((el) => el.addEventListener('click', (evt) => {
  if(evt.target === evt.currentTarget) {
    popupToggle();
  }
}))

// При нажатии на кнопку Esc закрывает все открытые попапы
document.addEventListener('keydown', (evt) => {
  if(evt.key === 'Escape') {
    popupToggle();
  }
})

popupProfileForm.addEventListener('submit', formSubmitHandler);
popupCardForm.addEventListener('submit', cardFormSubmitHandler);
