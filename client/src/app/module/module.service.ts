import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";

import { environment } from "../../environments/environment";
import { Module } from "./module.model";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ModuleService {

    constructor(private http: HttpClient) { }

    private moduleUrl = environment.baseUrl + '/module';

    public createModule(module: Module) {
        return this.http.post<Module>(this.moduleUrl, module, httpOptions);
    }

    public getModules() {
        return this.http.get<Module[]>(this.moduleUrl);
    }

    public getModule(moduleId: number) {
        return this.http.get<Module>(this.moduleUrl + "/" + moduleId);
    }

    public updateModule(module: Module) {
        return this.http.put<Module>(this.moduleUrl + "/" + module.moduleId, module, httpOptions);
    }

    public deleteModule(module: Module) {
        return this.http.delete(this.moduleUrl + "/" + module.moduleId);
    }

}