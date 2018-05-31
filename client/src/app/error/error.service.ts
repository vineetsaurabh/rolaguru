import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Error } from './error.model';
import { MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { AddCauseComponent } from '../cause/add-cause.component';
import { environment } from '../../environments/environment';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ErrorService {

  constructor(private http: HttpClient) {}

  private errorUrl = environment.baseUrl + '/flex-error';

  public getError(id: number) {
    return this.http.get<Error>(this.errorUrl + "/" + id);
  }

  public getErrorByCode(errCode: string) {
    let params = new HttpParams();
    params = params.append('code', errCode);
    return this.http.get<Error>(this.errorUrl + '/findbyerrcode', {params: params});
  }

  public getErrors() {
    return this.http.get<Error[]>(this.errorUrl);
  }

  public deleteError(error) {
    return this.http.delete(this.errorUrl + "/" + error.errid);
  }

  public createError(error) {
    return this.http.post<Error>(this.errorUrl, error);
  }

  public updateError(error) {
    return this.http.put<Error>(this.errorUrl + "/" + error.errid, error, httpOptions);
  }

  public addCause(error, dialog): Observable<boolean> {
    let dialogRef: MatDialogRef<AddCauseComponent>;
    dialogRef = dialog.open(AddCauseComponent, {
      data: [error.errid, error.errcode],
      width: '900px',
    });
    return dialogRef.afterClosed();
  }

}
