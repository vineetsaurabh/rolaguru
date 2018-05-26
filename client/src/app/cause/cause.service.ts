import { Observable } from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Cause } from './cause.model';
import { ErrorCause } from './error-cause.model';
import { CauseRating } from './cause-rating.model';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CauseService {

  constructor(private http: HttpClient) {}

  private causeUrl = 'http://localhost:8080/cause';

  private causeRatingUrl = 'http://localhost:8080/cause-rating';

  public getCause(id: number) {
    return this.http.get<Cause>(this.causeUrl + "/"+ id);
  }

  public deleteCause(cause) {
    return this.http.delete(this.causeUrl + "/"+ cause.casueid);
  }

  public createCause(cause, errid) {
    return this.http.post<Cause>(this.causeUrl, {"cause" : cause, "errid" : +errid});
  }
  
  public updateCause(cause) {
    return this.http.put<Cause>(this.causeUrl + "/" + cause.causeid, cause, httpOptions);
  }

  public createRating(causeRating) {
    return this.http.post<CauseRating>(this.causeRatingUrl, causeRating);
  }

  public updateRating(causeRating) {
    return this.http.put<CauseRating>(this.causeRatingUrl + "/" + causeRating.causeRatingId, causeRating, httpOptions);
  }

}
