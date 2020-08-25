export default class Card {
  constructor(item, cardSelector, userId, handleCardClick, cardButtonRemoveClick, handleCardLikeClick) {
    this._name = item.name;
    this._link = item.link;
    this._likes = item.likes;
    this._itemOwnerId = item.owner._id
    this._itemId = item._id;
    this._cardSelector = cardSelector;
    this._userId = userId;
    this._handleCardClick = handleCardClick;
    this._cardButtonRemoveClick = cardButtonRemoveClick;
    this._handleCardLikeClick = handleCardLikeClick;
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

    this._cardLike.addEventListener('click', () => {
      this._handleCardLikeClick(this._element, this._isLiked(), this._itemId)
    })

    this._cardImage.addEventListener('click', () =>{
       this._handleCardClick(this._name, this._link);
    });

    this._cardRemove.addEventListener('click', () => {
      this._cardButtonRemoveClick(this._itemId, this._element)
    });
  }

  _isLiked() {
    return this._cardLike.classList.contains('card__like_active');
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEvenetListeners();

    const cardTitle = this._element.querySelector('.card__title');
    const cardImage = this._element.querySelector('.card__image');
    const cardLikes = this._element.querySelector('.card__like-count');
    const CardRemoveButton = this._element.querySelector('.card__remove');

    cardTitle.textContent = this._name;
    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardLikes.textContent = this._likes.length;

    if (this._userId !== this._itemOwnerId) {
      CardRemoveButton.remove();
    }

    if(this._likes.some((el) => el._id === this._userId)) {
      this._cardLike.classList.add('card__like_active')
    }

    return this._element
  }
}
