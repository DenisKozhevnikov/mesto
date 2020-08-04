export class FormValidator {
  constructor(objClasses, formElement) {
    this._objClasses = objClasses;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._objClasses.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._objClasses.submitButtonSelector);
  }

  _toggleButtonState(inputElement) {
    if(this._hasInvalidInput(inputElement)) {
      this._buttonElement.classList.add(this._objClasses.inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', true);
    } else {
      this._buttonElement.classList.remove(this._objClasses.inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled');
    }
  }

  _hasInvalidInput(inputElement) {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid
    });
  }

  _checkInputValidity(inputElement) {
    if(!inputElement.validity.valid) {;
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
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
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputElement);
      });
    });
  }
}
