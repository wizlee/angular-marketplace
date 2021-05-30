import { Injectable } from '@angular/core';
import { User } from "./user";

const USER_OBJ_NAME: string = "user";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor() {}

  setUser(user: User) {
    window.localStorage[USER_OBJ_NAME] = JSON.stringify(user);
  }

  getUser(): User {
    let userObj: User;
    if (window.localStorage[USER_OBJ_NAME]) {
      userObj = JSON.parse(window.localStorage[USER_OBJ_NAME]);
    }
    return userObj;
  }

  logout() {
    window.localStorage.removeItem(USER_OBJ_NAME);
  }

  isLoggedIn(): boolean {
    let userObj: User;
    if (window.localStorage[USER_OBJ_NAME]) {
      userObj = JSON.parse(window.localStorage[USER_OBJ_NAME]);
    }
    return userObj?.isLoggedIn ? true : false;
  }
}
