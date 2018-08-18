import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpEvent } from '@angular/common/http';

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

    constructor(private http: HttpClient) { }

    private errorUrl = environment.baseUrl + '/flex-error';

    private errorSubscribeUrl = environment.baseUrl + '/flex-error-subscribe';

    public getError(id: number) {
        return this.http.get<Error>(this.errorUrl + "/" + id);
    }

    public getErrorByCode(errCode: string) {
        let params = new HttpParams();
        params = params.append('code', errCode);
        return this.http.get<Error>(this.errorUrl + '/findbyerrcode', { params: params });
    }

    public getAllErrors() {
        return this.http.get<Error[]>(this.errorUrl + "/findallerrors");
    }

    public getAllErrorsOfDomian(domain: string) {
        let params = new HttpParams();
        params = params.append('domain', domain);
        return this.http.get<Error[]>(this.errorUrl + "/findallerrorsofdomain", { params: params });
    }

    public deleteError(error: Error) {
        return this.http.delete(this.errorUrl + "/" + error.errid);
    }

    public createError(error: Error) {
        return this.http.post<Error>(this.errorUrl, error);
    }

    public updateError(error: Error) {
        error.causes = null;
        return this.http.put<Error>(this.errorUrl + "/" + error.errid, error, httpOptions);
    }

    public deleteErrors(errids: string[]) {
        let params = new HttpParams();
        params = params.append('errids', errids.join(","));
        return this.http.get<boolean>(this.errorUrl + "/deleteerrors", { params: params });
    }


    public importErrors(file: File, domain: string) {
        const formdata: FormData = new FormData();
        formdata.append('file', file);
        formdata.append('domain', domain);
        return this.http.post<number>(this.errorUrl + '/importerrors', formdata);
    }

    public exportErrorsInExcel(): Observable<any> {
        return this.http.get(this.errorUrl + '/exporterrorsinexcel', { observe: 'response', responseType: 'blob' });
    }

    public exportErrorsInPDF(): Observable<any> {
        return this.http.get(this.errorUrl + '/exporterrorsinpdf', { observe: 'response', responseType: 'blob' });
    }

    public subscribeError(errid) {
        return this.http.post(this.errorSubscribeUrl, errid);
    }

    public unSubscribeError(errid) {
        return this.http.delete(this.errorSubscribeUrl + "/" + errid);
    }

    public subscribeErrors(errids: string) {
        let params = new HttpParams();
        params = params.append('errids', errids);
        return this.http.get<number>(this.errorSubscribeUrl + "/subscribeerrors", { params: params });
    }

    public unSubscribeErrors(errids: string) {
        let params = new HttpParams();
        params = params.append('errids', errids);
        return this.http.get<number>(this.errorSubscribeUrl + "/unsubscribeerrors", { params: params });
    }

    public findErrors(input: string) {
        let params = new HttpParams();
        params = params.append('input', input);
        return this.http.get<Error[]>(this.errorUrl + '/finderrors', { params: params });
    }

    public getSubscribedErrors() {
        return this.http.get<Error[]>(this.errorSubscribeUrl + "/subscribederrors");
    }

    public uploadFile(file: File, errid: string): Observable<HttpEvent<Error>> {
        const formdata: FormData = new FormData();
        formdata.append('file', file);
        formdata.append('errid', errid);
        const req = new HttpRequest('POST', this.errorUrl + '/addfilestoerror', formdata, {
            reportProgress: true
        });
        return this.http.request(req);
    }

    public downloadFile(id): Observable<any> {
        return this.http.get(this.errorUrl + "/downloadfilefromerror/" + id, { observe: 'response', responseType: 'blob' });
    }

    public deleteFile(id): Observable<any>  {
        return this.http.delete<any>(this.errorUrl + "/deletefilefromerror/" + id);
    }


}
