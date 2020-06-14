let profileEditButton = document.querySelector(".profile__edit");
let profileName = document.querySelector(".profile__name");
let profileAboutMe = document.querySelector(".profile__about-me");

let popup = document.querySelector(".popup");
let popupCloseButton = popup.querySelector(".popup__close");

let formElement = document.querySelector(".form");
let formName = formElement.querySelector(".form__item_name");
let formAboutMe = formElement.querySelector(".form__item_about-me");

function popupToggle() {
  popup.classList.toggle("popup_opened")
}

function profileFormOpen() {
  formName.value = profileName.textContent;
  formAboutMe.value = profileAboutMe.textContent;
  popupToggle();
}

profileEditButton.addEventListener('click', profileFormOpen);
popupCloseButton.addEventListener('click', popupToggle);

function formSubmitHandler (evt) {
  evt.preventDefault();

  let nameInput = formName.value;
  let jobInput = formAboutMe.value;

  profileName.textContent = nameInput;
  profileAboutMe.textContent = jobInput;
  popupToggle();
}

formElement.addEventListener('submit', formSubmitHandler);
