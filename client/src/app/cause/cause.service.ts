import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpEvent, HttpRequest } from '@angular/common/http';

import { Cause } from './cause.model';
import { ErrorCause } from './error-cause.model';
import { CauseRating } from './cause-rating.model';
import { environment } from '../../environments/environment';
import { RequestOptions, ResponseContentType } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CauseService {

    constructor(private http: HttpClient) { }

    private causeUrl = environment.baseUrl + '/cause';

    private causeRatingUrl = environment.baseUrl + '/cause-rating';

    public getCause(id: number) {
        return this.http.get<Cause>(this.causeUrl + "/" + id);
    }

    public deleteCause(cause) {
        return this.http.delete(this.causeUrl + "/" + cause.causeid);
    }

    public createCause(cause, errid) {
        return this.http.post<Cause>(this.causeUrl, { "cause": cause, "errid": +errid });
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

    public uploadFile(file: File, causeid: string, category: string): Observable<HttpEvent<Cause>> {
        const formdata: FormData = new FormData();
        formdata.append('file', file);
        formdata.append('causeid', causeid);
        formdata.append('category', category);
        const req = new HttpRequest('POST', this.causeUrl + '/addfilestocause', formdata, {
            reportProgress: true
        });
        return this.http.request(req);
    }

    public downloadFile(id): Observable<any> {
        return this.http.get(this.causeUrl + "/downloadfilefromcause/" + id, { observe: 'response', responseType: 'blob' });
    }

    public deleteFile(id): Observable<any> {
        return this.http.delete<any>(this.causeUrl + "/deletefilefromcause/" + id);
    }

    private behaviourSubject = new BehaviorSubject<number>(0);
    public noOfDeleted = this.behaviourSubject.asObservable();
    public emitCauseDeleted(number) {
        this.behaviourSubject.next(number);
    }

}
