export const popupImage = document.querySelector('.popup_image');
export const popupFigureImage = popupImage.querySelector('.popup__image');
export const popupCaption = popupImage.querySelector('.popup__caption');

export const profileEditButton = document.querySelector('.profile__edit');
export const profileName = document.querySelector('.profile__name');
export const profileAboutMe = document.querySelector('.profile__about-me');

export const popupProfile = document.querySelector('.popup_profile');
export const popupProfileForm = popupProfile.querySelector('.popup__form');
export const popupProfileName = popupProfileForm.querySelector('.popup__item_name');
export const popupProfileAboutMe = popupProfileForm.querySelector('.popup__item_about-me');

export const addCardButton = document.querySelector('.profile__add-card');

export const popupCard = document.querySelector('.popup_add-card');

export const cardContainer = document.querySelector('.cards');

export const cardTemplateId = '#card-template';

export const validationConfig =  {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}
