import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector, popupFigureImage, popupCaption) {
    super(popupSelector)
    this._popupFigureImage = popupFigureImage;
    this._popupCaption = popupCaption;
  }

  open(name, link) {
    super.open();
    this._popupFigureImage.src = link;
    this._popupCaption.textContent = name;
  }
}
