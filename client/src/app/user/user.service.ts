import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpEvent, HttpRequest } from '@angular/common/http';
import { User } from './user.model';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {

    constructor(private http: HttpClient) { }

    private userUrl = environment.baseUrl + '/user';

    private errorSubscribeUrl = environment.baseUrl + '/flex-error-subscribe';

    public getUsers() {
        return this.http.get<User[]>(this.userUrl);
    }

    public getUser(userid: number) {
        return this.http.get<User>(this.userUrl + "/" + userid);
    }

    public getUserByUsername(username: string) {
        let params = new HttpParams();
        params = params.append('username', username);
        return this.http.get<User>(this.userUrl + '/findbyusername', { params: params });
    }

    public getUserByEmail(email: string) {
        let params = new HttpParams();
        params = params.append('email', email);
        return this.http.get<User>(this.userUrl + '/findbyemail', { params: params });
    }

    public deleteUser(user: User) {
        return this.http.delete(this.userUrl + "/" + user.userid);
    }

    public createUser(user: User) {
        return this.http.post<User>(this.userUrl, user, httpOptions);
    }

    public updateUser(user: User) {
        return this.http.put<User>(this.userUrl + "/" + user.userid, user, httpOptions);
    }

    public deleteUsers(userids: string[]) {
        let params = new HttpParams();
        params = params.append('userids', userids.join(","));
        return this.http.get<boolean>(this.userUrl + "/deleteusers", { params: params });
    }

    public getSubscribedErrorIds() {
        return this.http.get<string[]>(this.errorSubscribeUrl + "/getsubscribederrorids", );
    }

    public uploadFile(file: File): Observable<HttpEvent<User>> {
        const formdata: FormData = new FormData();
        formdata.append('file', file);
        const req = new HttpRequest('POST', this.userUrl + '/uploadProfilePicture', formdata, {
            reportProgress: true
        });
        return this.http.request(req);
    }

    public downloadFile(id): Observable<any> {
        return this.http.get(this.userUrl + "/downloadprofilepic/" + id, { observe: 'response', responseType: 'blob' });
    }

    public deleteFile(id): Observable<any>  {
        return this.http.delete<any>(this.userUrl + "/deleteprofilepicture/" + id);
    }

}
