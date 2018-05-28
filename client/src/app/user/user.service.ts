import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { User } from './user.model';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {}

  private userUrl = 'http://localhost:8080/user';

  public getUsers() {
    return this.http.get<User[]>(this.userUrl);
  }

  public getUser(userid: number) {
    return this.http.get<User>(this.userUrl + "/" + userid);
  }

  public getUserByUsername(username: string) {
    let params = new HttpParams();
    params = params.append('username', username);
    return this.http.get<User>(this.userUrl + '/findbyusername', {params: params});
  }

  public getUserByEmail(email: string) {
    let params = new HttpParams();
    params = params.append('email', email);
    return this.http.get<User>(this.userUrl + '/findbyemail', {params: params});
  }

  public deleteUser(user) {
    return this.http.delete(this.userUrl + "/" + user.userid);
  }

  public createUser(user) {
    return this.http.post<User>(this.userUrl, user, httpOptions);
  }

  public updateUser(user) {
    return this.http.put<User>(this.userUrl  + "/" + user.userid, user, httpOptions);
  }

}
