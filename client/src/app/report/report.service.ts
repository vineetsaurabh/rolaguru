import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { ErrorSearchHistory } from "./error-search-history.model";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ReportService {

    constructor(private http: HttpClient) { }

    private reportUrl = environment.baseUrl + '/report';

    public getSearchHistory() {
        return this.http.get<ErrorSearchHistory[]>(this.reportUrl + "/findallsearch");
    }

    public getMostSearchedString() {
        return this.http.get<any>(this.reportUrl + "/mostsearchstring");
    }

}