import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { Inject, Injectable, Component, ViewChild } from "@angular/core";
import { ToastrService } from "ngx-toastr";

import { Team } from "../team/team.model";
import { TeamService } from "../team/team.service";
import { User } from "./user.model";
import { UserService } from "./user.service";

@Injectable()
@Component({
    templateUrl: './assign-team.component.html'
})
export class AssignTeamComponent {

    users: User[];
    teams: Team[];

    allColumns = ['Checkbox', 'Name', 'Description'];
    displayedColumns = ['Checkbox', 'Name', 'Description'];
    dataSource: MatTableDataSource<Team>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private userService: UserService,
        private teamService: TeamService,
        private toastService: ToastrService,
        public dialogRef: MatDialogRef<AssignTeamComponent>,
        @Inject(MAT_DIALOG_DATA) public data: User[]) {
        this.users = this.data;
    }

    ngOnInit() {
        this.getTeams();
    }

    getTeams() {
        this.teamService.getTeams()
            .subscribe(data => {
                this.teams = data;
                this.dataSource = new MatTableDataSource(data);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            });
    }

    get selectedTeams() {
        return this.teams
            .filter(team => team.checked);
    }

    assignTeams() {
        this.users.forEach(user => 
            (user.teams = [], this.selectedTeams.forEach(team => user.teams.push(team))));
        this.userService.assignTeams(this.users)
            .subscribe(res => {
                this.toastService.success(`Teams assigned`);
                this.dialogRef.close(false);
            });
    }

}