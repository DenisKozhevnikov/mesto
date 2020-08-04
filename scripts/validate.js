// Подключение валидации для всех доступных форм на странице
// function enableValidation(objClasses) {
//   const formList = Array.from(document.querySelectorAll(objClasses.formSelector));
//   formList.forEach(function(formElement) {
//     setEventListeners(objClasses, formElement);
//   });
// }



class FormValidator {
  constructor(objClasses, formElement) {
    this._objClasses = objClasses;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._objClasses.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._objClasses.submitButtonSelector);
  }

  _setEventListeners() {
    this._toggleButtonState();

    this._inputList.forEach(function(inputElement) {
      console.log(inputElement);
      inputElement.addEventListener('input', function() {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  _toggleButtonState() {
    if(this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._objClasses.inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', true);
    } else {
      this._buttonElement.classList.remove(this._objClasses.inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled');
    }
  }

  _hasInvalidInput(inputElement) {
    return this._inputList.some(function(inputElement) {
      return !inputElement.validity.valid
    });
  }

  _checkInputValidity(inputElement) {
    if(!inputElement.validity.valid) {
      showInputError(inputElement, inputElement.validationMessage);
    } else {
      hideInputError(inputElement);
    }
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._objClasses.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._objClasses.errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._objClasses.inputErrorClass);
    errorElement.classList.remove(this._objClasses.errorClass);
    errorElement.textContent = '';
  }

  enableValidation() {
    this._setEventListeners()
  }

}


const validClasses =  {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

function addValid(validClasses) {
const formList = Array.from(document.querySelectorAll(validClasses.formSelector));
formList.forEach((formElement) => {
  const form = new FormValidator(validClasses, formElement);
  form.enableValidation();
})
}

addValid(validClasses);


// Установка слушателей на инпуты
// function setEventListeners(objClasses, formElement) {
//   const inputList = Array.from(formElement.querySelectorAll(objClasses.inputSelector));
//   const buttonElement = formElement.querySelector(objClasses.submitButtonSelector);
//   toggleButtonState(objClasses, inputList, buttonElement);

//   inputList.forEach(function(inputElement) {
//     inputElement.addEventListener('input', function() {
//       checkInputValidity(objClasses, formElement, inputElement);
//       toggleButtonState(objClasses, inputList, buttonElement);
//     });
//   });
// }

// Переключение состояния кнопки
// function toggleButtonState(objClasses, inputList, buttonElement) {
//   if(hasInvalidInput(inputList)) {
//     buttonElement.classList.add(objClasses.inactiveButtonClass);
//     buttonElement.setAttribute('disabled', true);
//   } else {
//     buttonElement.classList.remove(objClasses.inactiveButtonClass);
//     buttonElement.removeAttribute('disabled');
//   }
// }

// Возвращает валидны ли инпуты в форме
// function hasInvalidInput(inputList) {
//   return inputList.some(function(inputElement) {
//     return !inputElement.validity.valid
//   });
// }

// Проверяет валидность инпута
// function checkInputValidity(objClasses, form, inputElement) {
//   if(!inputElement.validity.valid) {
//     showInputError(objClasses, form, inputElement, inputElement.validationMessage);
//   } else {
//     hideInputError(objClasses, form, inputElement);
//   }
// }

// Показывает ошибку
// const showInputError = (objClasses, form, inputElement, errorMessage) => {
//   const errorElement = form.querySelector(`#${inputElement.id}-error`);
//   inputElement.classList.add(objClasses.inputErrorClass);
//   errorElement.textContent = errorMessage;
//   errorElement.classList.add(objClasses.errorClass);
// };

// Показывает ошибку
// function showInputError(objClasses, form, inputElement, errorMessage) {
//   const errorElement = form.querySelector(`#${inputElement.id}-error`);
//   inputElement.classList.add(objClasses.inputErrorClass);
//   errorElement.textContent = errorMessage;
//   errorElement.classList.add(objClasses.errorClass);
// };

// Скрывает ошибку
// const hideInputError = (objClasses, form, inputElement) => {
//   const errorElement = form.querySelector(`#${inputElement.id}-error`);
//   inputElement.classList.remove(objClasses.inputErrorClass);
//   errorElement.classList.remove(objClasses.errorClass);
//   errorElement.textContent = '';
// };

// function hideInputError(objClasses, form, inputElement) {
//   const errorElement = form.querySelector(`#${inputElement.id}-error`);
//   inputElement.classList.remove(objClasses.inputErrorClass);
//   errorElement.classList.remove(objClasses.errorClass);
//   errorElement.textContent = '';
// };

// enableValidation({
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__button',
//   inactiveButtonClass: 'popup__button_disabled',
//   inputErrorClass: 'popup__input_type_error',
//   errorClass: 'popup__error_visible'
// });

