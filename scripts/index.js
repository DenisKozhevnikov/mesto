let profileEditButton = document.querySelector(".profile__edit");
let profileName = document.querySelector(".profile__name");
let profileAboutMe = document.querySelector(".profile__about-me");

let popup = document.querySelector(".popup");
let popupCloseButton = popup.querySelector(".popup__close");

let formElement = document.querySelector(".popup__form");
let formName = formElement.querySelector(".popup__item_name");
let formAboutMe = formElement.querySelector(".popup__item_about-me");


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

profileEditButton.addEventListener('click', popupToggle);
popupCloseButton.addEventListener('click', popupToggle);
formElement.addEventListener('submit', formSubmitHandler);
