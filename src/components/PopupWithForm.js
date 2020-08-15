import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmit) {
    super(popupSelector)
    this._popupFormSelector = this._popupSelector.querySelector('.popup__form');
    this._formSubmit = formSubmit;
  }

  _getInputValues() {
    const popupInputs = Array.from(this._popupFormSelector.querySelectorAll('.popup__input'));

    return popupInputs.reduce((result, current) => Object.assign(result, {[current.name]:current.value}), {})
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupFormSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._popupFormSelector.reset();
  }
}
