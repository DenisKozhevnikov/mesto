export default class Section {
  constructor({renderer}, containerSelector, userId) {
    this._renderer = renderer;

    this._container = containerSelector;

    this._userId = userId;
  }

  renderer(items) {
    items.forEach(item => {
      this._renderer(item);
    })
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
