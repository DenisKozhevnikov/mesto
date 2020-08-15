import { initialCards } from '../utils/initialCards.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js';
import { popupImage,
  popupFigureImage,
  popupCaption,
  profileEditButton,
  profileName,
  profileAboutMe,
  popupProfile,
  popupProfileName,
  popupProfileAboutMe,
  addCardButton,
  popupCard,
  cardContainer,
  cardTemplateId,
  validationConfig
} from '../utils/constants.js';
import './index.css';

//Очистка формы от ошибок валидации
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

//Просмотр состояния кнопки в попапе
function formButtonState(popup) {
  const formInputs = Array.from(popup.querySelectorAll('.popup__input'));
  const submitButton = popup.querySelector('.popup__button');

  if (!formInputs.some((elem) => elem.validity.valid)) {
    submitButton.setAttribute('disabled', true);
    submitButton.classList.add('popup__button_disabled');
  } else {
    submitButton.removeAttribute('disabled');
    submitButton.classList.remove('popup__button_disabled');
  }
}

const popupImageInstance = new PopupWithImage(popupImage, popupFigureImage, popupCaption);
popupImageInstance.setEventListeners();

const handleCardClick = (name, link) => {
  popupImageInstance.open(name, link)
}

const createCard = (item) => {
  const card = new Card(item, cardTemplateId, handleCardClick);

  return card.generateCard();
}

//Экземпляр начальных карточек
const cardSection = new Section({
  items: initialCards.reverse(),
  renderer: (item) => {
    cardSection.addItem(createCard(item))
  }
}, cardContainer)

cardSection.renderer();

const user = new UserInfo({
  nameSelector: profileName,
  aboutMeSelector: profileAboutMe
})

//Экземпляра формы добавления карточки
const popupCardInstance = new PopupWithForm(popupCard, (inputValues) => {
  cardSection.addItem(createCard(inputValues));

  popupCardInstance.close();
  }
);
popupCardInstance.setEventListeners();

//Включение валидации всех форм
function addValidation(validationConfig) {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));

  formList.forEach((formElement) => {
    const form = new FormValidator(validationConfig, formElement);

    form.enableValidation();
  })
}

addValidation(validationConfig);

//Экземпляр формы редактирования профиля
const popupProfileInstance = new PopupWithForm(popupProfile, (inputValues) => {

    user.setUserInfo(inputValues);

    popupProfileInstance.close();
  }
);
popupProfileInstance.setEventListeners();

//Слушатель кнопки редактирования профиля
profileEditButton.addEventListener('click', () => {
  const currentUser = user.getUserInfo();

  if(!popupProfile.classList.contains('popup_opened')) {
    popupProfileName.value = currentUser.name;
    popupProfileAboutMe.value = currentUser.aboutMe;
  }

  removeValidationError(popupProfile);
  formButtonState(popupProfile);

  popupProfileInstance.open();
});

//Слушатель кнопки добавления карточки
addCardButton.addEventListener('click', () => {
  formButtonState(popupCard)
  removeValidationError(popupCard);

  popupCardInstance.open();
});
