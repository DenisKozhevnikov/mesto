import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
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
  validationConfig,
  popupCardDelete,
  popupAvatarEdit,
  profileAvatarContainer,
  profileAvatar,
  groupId,
  token
} from '../utils/constants.js';
import './index.css';

let itemId;
let cardElement;

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

function downloadNotification(form, buttonText = 'Сохранение...') {
  form.querySelector('.popup__button').textContent = buttonText
}

const api = new Api({
  baseUrl: `https://mesto.nomoreparties.co/v1/${groupId}`,
  headers: {
    authorization: token,
    'Content-Type': 'application/json'
  }
})

const user = new UserInfo({
  nameSelector: profileName,
  aboutMeSelector: profileAboutMe,
  avatarSelector: profileAvatar
})

api.getUserInfo()
  .then((result) => {
    user.setUserInfo({
      name: result.name,
      aboutMe: result.about,
      id: result._id
    });

    user.setAvatar(result.avatar);
  })
  .catch((err) => console.log(err));

api.getItems()
  .then((result) => {
    cardSection.renderer(result);
  })
  .catch((err) => console.log(err));

// Экземпляр всплывающего окна с изображением
const popupImageInstance = new PopupWithImage(popupImage, popupFigureImage, popupCaption);
popupImageInstance.setEventListeners();

const handleCardClick = (name, link) => {
  popupImageInstance.open(name, link)
}

const cardButtonRemoveClick = (id, element) => {
  itemId = id
  cardElement = element

  popupCardDeleteInstance.open();
}

const handleCardLikeClick = (card, isLiked, cardId) => {
  const cardLike = card.querySelector('.card__like');
  const cardLikesCount = card.querySelector('.card__like-count')

  api.toggleLike(cardId, isLiked)
    .then((res) => {
      cardLike.classList.toggle('card__like_active');
      cardLikesCount.textContent = res.likes.length;
    })
    .catch((err) => console.log(err))
}

// Создание карточки
const createCard = (item) => {
  const card = new Card(item, cardTemplateId, user.id(), handleCardClick, cardButtonRemoveClick, handleCardLikeClick);

  return card.generateCard();
}

// Секция с карточками
const cardSection = new Section({
  renderer: (item) => {
    cardSection.addItem(createCard(item))
  }
}, cardContainer)

//Экземпляра формы добавления карточки
const popupCardInstance = new PopupWithForm(popupCard, (inputValues) => {
  downloadNotification(popupCard)

  api.createItem(inputValues)
    .then((res) => {
      cardSection.addItem(createCard(res))

      popupCardInstance.close()
    })
    .catch((err) => console.log(err))
    .finally(() => downloadNotification(popupCard, 'Создать'))
})
popupCardInstance.setEventListeners();

// Экземпляр формы удаления карточки
const popupCardDeleteInstance = new PopupWithForm(popupCardDelete, () => {
  downloadNotification(popupCardDelete, 'Удаление...')

  api.deleteItem(itemId)
    .then(() => {
      cardElement.remove()
      popupCardDeleteInstance.close();
    })
    .catch((err) => console.log(err))
    .finally(() => downloadNotification(popupCardDelete, 'Да'))
})
popupCardDeleteInstance.setEventListeners();

//Экземпляр формы редактирования аватара
const popupAvatarEditInstance = new PopupWithForm(popupAvatarEdit, (inputValues) => {
  downloadNotification(popupAvatarEdit)

  api.changeAvatar(inputValues.link)
    .then((res) => {
      profileAvatar.src = res.avatar;
      popupAvatarEditInstance.close();
    })
    .catch((err) => console.log(err))
    .finally(() => downloadNotification(popupAvatarEdit, 'Сохранить'))
})
popupAvatarEditInstance.setEventListeners();

//Включение валидации всех форм
function addValidation(configuration) {
  const formList = Array.from(document.querySelectorAll(configuration.formSelector));

  formList.forEach((formElement) => {
    const form = new FormValidator(configuration, formElement);

    form.enableValidation();
  })
}

addValidation(validationConfig);

//Экземпляр формы редактирования профиля
const popupProfileInstance = new PopupWithForm(popupProfile, (inputValues) => {
  downloadNotification(popupProfile)

  api.setUserInfo(inputValues)
    .then((result) => {
      user.setUserInfo({
        name: result.name,
        aboutMe: result.about
      });
      popupProfileInstance.close();
    })
    .catch((err) => console.log(err))
    .finally(() => downloadNotification(popupProfile, 'Сохранить'))
});
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

//Слушатель кнопки изменения аватара
profileAvatarContainer.addEventListener('click', () => {
  formButtonState(popupAvatarEdit)
  removeValidationError(popupAvatarEdit);

  popupAvatarEditInstance.open();
})
