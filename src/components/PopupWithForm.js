import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmit) {
    super(popupSelector)
    this._popupFormSelector = this._popupSelector.querySelector('.popup__form');
    this._formSubmit = formSubmit;
  }

  _getInputValues() {
    const inputValues = {}
    const popupInputs = this._popupFormSelector.querySelectorAll('.popup__input');

    popupInputs.forEach((el) => {
      inputValues[el.name] = el.value;
    })

    return inputValues
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupFormSelector.addEventListener('submit', this._formSubmit);
  }

  close() {
    super.close();
    this._popupFormSelector.reset();
  }
}
