import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Error } from './error.model';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ErrorService {

  constructor(private http: HttpClient) {}

  private errorUrl = 'http://localhost:8080/flex-error';

  public getErrors() {
    return this.http.get<Error[]>(this.errorUrl);
  }

  public deleteError(error) {
    return this.http.delete(this.errorUrl + "/"+ error.id);
  }

  public createError(error) {
    return this.http.post<Error>(this.errorUrl, error);
  }

}
