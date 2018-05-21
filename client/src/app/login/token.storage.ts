import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';
const CUREENT_USER = 'currentUser';

@Injectable()
export class TokenStorage {

  constructor() { }

  signOut() {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.removeItem(CUREENT_USER);
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY,  token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveCurrentUser(currentUser: string) {
    window.sessionStorage.removeItem(CUREENT_USER);
    window.sessionStorage.setItem(CUREENT_USER,  currentUser);
  }

  public getCurrentUser(): string {
    return sessionStorage.getItem(CUREENT_USER);
  }
}
