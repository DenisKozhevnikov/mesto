export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers
  }

  _response() {
    return (res) => {
      if(res.ok) {
        return res.json()
      }

      return Promise.reject(`Ошибка: ${res.status}`)
    }
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, { headers:this._headers })
      .then(this._response())
  }

  setUserInfo({ name, aboutMe }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers:this._headers,
      body: JSON.stringify({
        name: name,
        about: aboutMe
        })
      })
      .then(this._response())
  }

  changeAvatar(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers:this._headers,
      body: JSON.stringify({
        avatar: link
        })
      })
      .then(this._response())
  }

  getItems() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
      })
      .then(this._response())
  }

  deleteItem(itemId) {
    return fetch(`${this._baseUrl}/cards/${itemId}`, {
      method: 'DELETE',
      headers: this._headers
      })
      .then(this._response())
  }

  createItem({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
          name: name,
          link: link
        })
      })
      .then(this._response())
  }

  setLike(itemId) {
    return fetch(`${this._baseUrl}/cards/likes/${itemId}`, {
      method: 'PUT',
      headers: this._headers
    })
    .then(this._response())
  }

  deleteLike(itemId) {
    return fetch(`${this._baseUrl}/cards/likes/${itemId}`, {
      method: 'DELETE',
      headers: this._headers
      })
      .then(this._response())
  }
}
