import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmit) {
    super(popupSelector)
    this._popupFormSelector = this._popupSelector.querySelector('.popup__form');
    this._formSubmit = formSubmit;
  }

  _getInputValues() {
    return Object.fromEntries(new FormData(this._popupFormSelector))
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
