import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";

import { environment } from "../../environments/environment";
import { Role } from "./role.model";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class RoleService {

    constructor(private http: HttpClient) { }

    private roleUrl = environment.baseUrl + '/role';

    public createRole(role: Role) {
        return this.http.post<Role>(this.roleUrl, role, httpOptions);
    }

    public getRoles() {
        return this.http.get<Role[]>(this.roleUrl);
    }

    public getRole(roleid: number) {
        return this.http.get<Role>(this.roleUrl + "/" + roleid);
    }

    public updateRole(role: Role) {
        return this.http.put<Role>(this.roleUrl + "/" + role.roleid, role, httpOptions);
    }

    public deleteRole(role: Role) {
        return this.http.delete(this.roleUrl + "/" + role.roleid);
    }

}