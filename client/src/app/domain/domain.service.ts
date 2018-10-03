import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";

import { environment } from "../../environments/environment";
import { Domain } from "./domain.model";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class DomainService {

    constructor(private http: HttpClient) { }

    private domainUrl = environment.baseUrl + '/domain';

    public createDomain(domain: Domain) {
        return this.http.post<Domain>(this.domainUrl, domain, httpOptions);
    }

    public getDomains() {
        return this.http.get<Domain[]>(this.domainUrl);
    }

    public getDomain(domainId: number) {
        return this.http.get<Domain>(this.domainUrl + "/" + domainId);
    }

    public updateDomain(domain: Domain) {
        return this.http.put<Domain>(this.domainUrl + "/" + domain.domainId, domain, httpOptions);
    }

    public deleteDomain(domain: Domain) {
        return this.http.delete(this.domainUrl + "/" + domain.domainId);
    }

}