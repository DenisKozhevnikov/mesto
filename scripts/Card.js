import { openPopup } from './index.js'

export class Card {
  constructor(item, cardSelector) {
    this._name = item.name;
    this._link = item.link;
    this._cardSelector = cardSelector;

    this._cardContainer = document.querySelector('.cards');
    this._popupImage = document.querySelector('.popup_image');
    this._popupFigureImage = this._popupImage.querySelector('.popup__image');
    this._popupCaption = this._popupImage.querySelector('.popup__caption');
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._cardSelector).content.querySelector('.card').cloneNode(true);

    return cardTemplate
  }

  _setEvenetListeners() {
    this._cardLike = this._element.querySelector('.card__like');
    this._cardImage = this._element.querySelector('.card__image');
    this._cardRemove = this._element.querySelector('.card__remove');

    this._cardLike.addEventListener('click', (evt) => {
      evt.target.classList.toggle('card__like_active');
    })

    this._cardImage.addEventListener('click', (evt) => {
      this._popupFigureImage.src = evt.target.src;
      this._popupCaption.textContent = evt.target.alt;
      openPopup(this._popupImage);
    });

    this._cardRemove.addEventListener('click', (evt) => {
      this._element.remove();
      this._element = null;

      if(!this._cardContainer.children.length) {
        const noCardTemplate = document.querySelector('#no-card-template').content;
        const noCardElement = noCardTemplate.cloneNode(true);

        this._cardContainer.append(noCardElement);
      }
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEvenetListeners();

    const cardTitle = this._element.querySelector('.card__title');
    const cardImage = this._element.querySelector('.card__image');

    cardTitle.textContent = this._name;
    cardImage.src = this._link;
    cardImage.alt = this._name;

    return this._element
  }
}
