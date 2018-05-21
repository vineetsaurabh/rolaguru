import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenStorage } from './token.storage';

@Injectable()
export class AuthService {

  constructor(
    private http: HttpClient,
    private token: TokenStorage) {
  }

  attemptAuth(username: string, password: string): Observable<any> {
    const credentials = {username: username, password: password};
    return this.http.post<any>('http://localhost:8080/token/generate-token', credentials);
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
