import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";

import { environment } from "../../environments/environment";
import { Team } from "./team.model";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class TeamService {

    constructor(private http: HttpClient) { }

    private teamUrl = environment.baseUrl + '/team';

    public createTeam(team: Team) {
        return this.http.post<Team>(this.teamUrl, team, httpOptions);
    }

    public getTeams() {
        return this.http.get<Team[]>(this.teamUrl);
    }

    public getTeam(teamid: number) {
        return this.http.get<Team>(this.teamUrl + "/" + teamid);
    }

    public updateTeam(team: Team) {
        return this.http.put<Team>(this.teamUrl + "/" + team.teamid, team, httpOptions);
    }

    public deleteTeam(team: Team) {
        return this.http.delete(this.teamUrl + "/" + team.teamid);
    }

}