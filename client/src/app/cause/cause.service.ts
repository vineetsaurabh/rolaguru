import { Observable } from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Cause } from './cause.model';
import { ErrorCause } from './error-cause.model';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CauseService {

  constructor(private http: HttpClient) {}

  private causeUrl = 'http://localhost:8080/cause';

  private errorCauseUrl = 'http://localhost:8080/error-cause';

  public getCause(id: number) {
    return this.http.get<Cause>(this.causeUrl + "/"+ id);
  }

  public deleteCause(cause) {
    return this.http.delete(this.causeUrl + "/"+ cause.casueid);
  }

  public createCause(cause, errid) {
    return this.http.post<Cause>(this.causeUrl, {"cause" : cause, "errid" : +errid});
  }

  public createErrorCause(error_Cause) {
    return this.http.post<ErrorCause>(this.errorCauseUrl, error_Cause);
  }

  public getErrorCause(id: number) {
    return this.http.get<ErrorCause>(this.errorCauseUrl + "/"+ id);
  }

  public deleteErrorCause(error_cause) {
    return this.http.delete(this.errorCauseUrl + "/"+ error_cause.errorcauseid);
  }

}