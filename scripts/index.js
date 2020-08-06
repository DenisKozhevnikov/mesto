import { initialCards } from "./initialCards.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const profileEditButton = document.querySelector(".profile__edit");
const profileName = document.querySelector(".profile__name");
const profileAboutMe = document.querySelector(".profile__about-me");

const popups = document.querySelectorAll(".popup");

const popupProfile = document.querySelector(".popup_profile");
const popupProfileForm = popupProfile.querySelector(".popup__form");
const popupProfileName = popupProfileForm.querySelector(".popup__item_name");
const popupProfileAboutMe = popupProfileForm.querySelector(".popup__item_about-me");

const addCardButton = document.querySelector('.profile__add-card');

const popupCard = document.querySelector(".popup_add-card");
const popupCardForm = popupCard.querySelector(".popup__form");
const popupCardFormName = popupCardForm.querySelector(".popup__item_name");
const popupCardFormLink = popupCardForm.querySelector(".popup__item_link");

const cardContainer = document.querySelector('.cards');

const popupCloseButtons = document.querySelectorAll(".popup__close");

// Показать/закрыть всплывающее окно
export function popupToggle(popup) {
  if(popup) {
    popup.classList.toggle("popup_opened");

    formButtonState(popup)
  } else {
    popups.forEach((el) => {
      if(el.classList.contains('popup_opened')) {
        el.classList.toggle('popup_opened');
        removeValidationError(el);
      }
    });
  }
}

// Очистка формы от ошибок валидации
function removeValidationError(popup) {
  const popupInputs = popup.querySelectorAll('.popup__input');
  const popupErrors = popup.querySelectorAll('.popup__error');
  popupInputs.forEach((el) => {
    if(el.classList.contains('popup__input_type_error')) {
      el.classList.remove('popup__input_type_error');
    }
  });
  popupErrors.forEach((el) => {
    if(el.classList.contains('popup__error_visible')) {
      el.classList.remove('popup__error_visible');
    }
  });
}

function formButtonState(popup) {
  const formInputs = Array.from(popup.querySelectorAll('.popup__input'));
  const submitButton = popup.querySelector('.popup__button');

  if (submitButton && formInputs.every((elem) => elem.validity.valid)) {
    submitButton.removeAttribute('disabled');
    submitButton.classList.remove('popup__button_disabled');
  } else if(submitButton) {
    submitButton.setAttribute('disabled', true);
    submitButton.classList.add('popup__button_disabled');
  }
}

function addCard(item, appendCard) {
  const card = new Card(item, '#card-template')
  const cardElement = card.generateCard();

  if(appendCard) {
    cardContainer.append(cardElement);
  } else {
    cardContainer.prepend(cardElement);
  }
}

// Добавление карточек из массива
initialCards.forEach((elem) => {
  addCard(elem, true);
})

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

const validationConfig =  {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

function addValidation(validationConfig) {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));

  formList.forEach((formElement) => {
    const form = new FormValidator(validationConfig, formElement);
    form.enableValidation();
  })
}

addValidation(validationConfig);

// Слушатель кнопки редактирования профиля
profileEditButton.addEventListener('click', () => {
  if(!popupProfile.classList.contains("popup_opened")) {
    popupProfileName.value = profileName.textContent;
    popupProfileAboutMe.value = profileAboutMe.textContent;
  }

  popupToggle(popupProfile);
});

addCardButton.addEventListener('click', () => {
  popupToggle(popupCard);
});

// Слушатель кнопок закрытия всплывающих окон
popupCloseButtons.forEach((el) => {
  el.addEventListener('click', () => popupToggle());
});

// Закрытие попапа по клику на оверлей
popups.forEach((el) => el.addEventListener('click', (evt) => {
  if(evt.target === evt.currentTarget) {
    popupToggle();
  }
}));

// При нажатии на кнопку Esc закрывает все открытые попапы
document.addEventListener('keydown', (evt) => {
  if(evt.key === 'Escape') {
    popupToggle();
  }
});

popupProfileForm.addEventListener('submit', formSubmitHandler);
popupCardForm.addEventListener('submit', cardFormSubmitHandler);
