import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';

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

    public getErrors(category: string) {
        let params = new HttpParams();
        params = params.append('category', category);
        return this.http.get<Error[]>(this.errorUrl, { params: params });
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

    public deleteErrors(errids: string[]) {
        let params = new HttpParams();
        params = params.append('errids', errids.join(","));
        return this.http.get<boolean>(this.errorUrl + "/deleteerrors", { params: params });
    }


    public importErrors(file: File, category: string) {
        const formdata: FormData = new FormData();
        formdata.append('file', file);
        formdata.append('category', category);
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

}
