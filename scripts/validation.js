// Подключение валидации для всех доступных форм на странице
function enableValidation(objClasses) {
  const formList = Array.from(document.querySelectorAll(objClasses.formSelector));
  formList.forEach(function(formElement) {
    setEventListeners(objClasses, formElement);
  })
}

// Установка слушателей на инпуты
function setEventListeners(objClasses, formElement) {
  const inputList = Array.from(formElement.querySelectorAll(objClasses.inputSelector));
  const buttonElement = formElement.querySelector(objClasses.submitButtonSelector);
  toggleButtonState(objClasses, inputList, buttonElement);

  inputList.forEach(function(inputElement) {
    inputElement.addEventListener('input', function() {
      checkInputValidity(objClasses, formElement, inputElement);
      toggleButtonState(objClasses, inputList, buttonElement);
    })
  })
}

// Переключение состояния кнопки
function toggleButtonState(objClasses, inputList, buttonElement) {
  if(hasInvalidInput(inputList)) {
    buttonElement.classList.add(objClasses.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(objClasses.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
}

// Возвращает валидны ли инпуты в форме
function hasInvalidInput(inputList) {
  return inputList.some(function(inputElement) {
    return !inputElement.validity.valid
  })
}

// Проверяет валидность инпута
function checkInputValidity(objClasses, form, inputElement) {
  if(!inputElement.validity.valid) {
    showInputError(objClasses, form, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(objClasses, form, inputElement);
  }
}

// Показывает ошибку
const showInputError = (objClasses, form, inputElement, errorMessage) => {
  const errorElement = form.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(objClasses.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(objClasses.errorClass);
};

// Скрывает ошибку
const hideInputError = (objClasses, form, inputElement) => {
  const errorElement = form.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(objClasses.inputErrorClass);
  errorElement.classList.remove(objClasses.errorClass);
  errorElement.textContent = '';
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});
