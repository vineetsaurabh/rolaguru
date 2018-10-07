import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import { TokenStorage } from './token.storage';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {

  private tokenUrl = environment.baseUrl + '/token/generate-token';

  constructor(
    private http: HttpClient,
    private token: TokenStorage) {
  }

  attemptAuth(username: string, password: string): Observable<any> {
    const credentials = {username: username, password: password};
    return this.http.post<any>(this.tokenUrl, credentials);
  }

  public getToken(): string {
    return window.sessionStorage.getItem('token');
  }

  public isAuthenticated(): boolean {
    const token = this.token.getToken();
    return !(token == null);
    //return tokenNotExpired(token); //import decode from 'jwt-decode';
  }

}
