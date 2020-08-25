export default class UserInfo {
  constructor({ nameSelector, aboutMeSelector, avatarSelector}) {
    this._nameSelector = nameSelector;
    this._aboutMeSelector = aboutMeSelector;
    this._avatarSelector = avatarSelector;
    this._id;
  }

  getUserInfo() {
    return {
      name: this._nameSelector.textContent,
      aboutMe: this._aboutMeSelector.textContent
    }
  }

  setUserInfo({name, aboutMe, id}) {
    this._nameSelector.textContent = name;
    this._aboutMeSelector.textContent = aboutMe;
    this._id = id
  }

  setAvatar(imageUrl) {
    this._avatarSelector.src = imageUrl;
  }

  id() {
    return this._id
  }
}
