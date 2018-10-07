import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient, HttpParams } from "@angular/common/http";

import { environment } from "../../environments/environment";
import { UserPreference } from "./user-preference.model";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserPreferenceService {

    constructor(private http: HttpClient) { }

    private userPreferenceUrl = environment.baseUrl + '/userpreference';

    public createUserPreference(userPreference: UserPreference) {
        return this.http.post<UserPreference>(this.userPreferenceUrl, userPreference, httpOptions);
    }

    public getUserPreference(userPreferenceId: number) {
        return this.http.get<UserPreference>(this.userPreferenceUrl + "/" + userPreferenceId);
    }

    public getCurrentUserPreference() {
        return this.http.get<UserPreference>(this.userPreferenceUrl);
    }

    public updateUserPreference(userPreference: UserPreference) {
        return this.http.put<UserPreference>(this.userPreferenceUrl + "/" + userPreference.userPreferenceId, userPreference, httpOptions);
    }

    public deleteUserPreference(userPreference: UserPreference) {
        return this.http.delete(this.userPreferenceUrl + "/" + userPreference.userPreferenceId);
    }

}