import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";

import { environment } from "../../environments/environment";
import { PriorityType } from "./priority-type.model";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class PriorityTypeService {

    constructor(private http: HttpClient) { }

    private priorityTypeUrl = environment.baseUrl + '/prioritytype';

    public createPriorityType(priorityType: PriorityType) {
        return this.http.post<PriorityType>(this.priorityTypeUrl, priorityType, httpOptions);
    }

    public getPriorityTypes() {
        return this.http.get<PriorityType[]>(this.priorityTypeUrl);
    }

    public getPriorityType(priorityTypeid: number) {
        return this.http.get<PriorityType>(this.priorityTypeUrl + "/" + priorityTypeid);
    }

    public updatePriorityType(priorityType: PriorityType) {
        return this.http.put<PriorityType>(this.priorityTypeUrl + "/" + priorityType.priorityTypeid, priorityType, httpOptions);
    }

    public deletePriorityType(priorityType: PriorityType) {
        return this.http.delete(this.priorityTypeUrl + "/" + priorityType.priorityTypeid);
    }

}