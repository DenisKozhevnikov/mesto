export default class UserInfo {
  constructor({ nameSelector, aboutMeSelector}) {
    this._nameSelector = nameSelector;
    this._aboutMeSelector = aboutMeSelector;
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
}
