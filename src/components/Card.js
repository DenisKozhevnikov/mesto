export default class Card {
  constructor(item, cardSelector, handleCardClick) {
    this._name = item.name;
    this._link = item.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardTemplate = document
    .querySelector(this._cardSelector)
    .content.querySelector('.card')
    .cloneNode(true);

    return cardTemplate
  }

  _setEvenetListeners() {
    this._cardLike = this._element.querySelector('.card__like');
    this._cardImage = this._element.querySelector('.card__image');
    this._cardRemove = this._element.querySelector('.card__remove');

    this._cardLike.addEventListener('click', (evt) => {
      evt.target.classList.toggle('card__like_active');
    })

    this._cardImage.addEventListener('click', () =>{
       this._handleCardClick(this._name, this._link);
    });

    this._cardRemove.addEventListener('click', () => {
      this._element.remove();
      this._element = null;
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
