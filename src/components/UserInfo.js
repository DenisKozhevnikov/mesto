export default class UserInfo {
  constructor({ nameSelector, aboutMeSelector, avatarSelector}) {
    this._nameSelector = nameSelector;
    this._aboutMeSelector = aboutMeSelector;
    this._avatarSelector = avatarSelector;
  }

  getUserInfo() {
    return {
      name: this._nameSelector.textContent,
      aboutMe: this._aboutMeSelector.textContent
    }
  }

  setUserInfo({name, aboutMe}) {
    this._nameSelector.textContent = name;
    this._aboutMeSelector.textContent = aboutMe;
  }

  setAvatar(imageUrl) {
    this._avatarSelector.src = imageUrl;
  }
}
