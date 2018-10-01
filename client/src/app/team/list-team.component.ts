
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort, MatDialogRef, MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { ToastrService } from 'ngx-toastr';

import { Team } from './team.model';
import { TeamService } from './team.service';
import { AddTeamComponent } from './add-team.component';
import { EditTeamComponent } from './edit-team.component';
import { ConfirmDeleteComponent } from '../util/confirm-delete.component';
import { ListComponent } from '../common/list.component';

@Component({
    selector: 'app-comp',
    templateUrl: './list-team.component.html'
})
export class ListTeamComponent extends ListComponent implements OnInit {

    teams: Team[];
    allColumns = ['Checkbox', 'Name', 'Description', 'Actions'];
    displayedColumns = ['Checkbox', 'Name', 'Description', 'Actions'];
    dataSource: MatTableDataSource<Team>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private router: Router,
        private teamService: TeamService,
        private toastService: ToastrService,
        protected dialog: MatDialog) {
            super(dialog);
    }

    ngOnInit() {
        this.dialog.afterAllClosed.subscribe(() => {
            this.getTeams();
        });
    };

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase();
        this.dataSource.filter = filterValue;
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

    public addTeam(): Observable<boolean> {
        let dialogRef: MatDialogRef<AddTeamComponent>;
        dialogRef = this.dialog.open(AddTeamComponent, {
            width: '600px',
            height: '320px',
            disableClose: true,
            autoFocus: false,
        });
        return dialogRef.afterClosed();
    }

    public editTeam(id: string): Observable<boolean> {
        let dialogRef: MatDialogRef<EditTeamComponent>;
        dialogRef = this.dialog.open(EditTeamComponent, {
            data: id,
            width: '400px',
            disableClose: true,
            autoFocus: false,
        });
        return dialogRef.afterClosed();
    }

    onDeleteTeam(team: Team) {
        let dialogRef: MatDialogRef<ConfirmDeleteComponent>;
        dialogRef = this.dialog.open(ConfirmDeleteComponent, {
            data: `Are you sure you want to delete user ${team.teamName}?`
        });
        dialogRef.afterClosed().subscribe((ok: boolean) => {
            if (ok) {
                this.deleteTeam(team);
            }
        });
    }

    deleteTeam(team: Team): void {
        this.teamService.deleteTeam(team)
            .subscribe(data => {
                this.teams = this.teams.filter(u => u !== team);
                this.toastService.success(`Team ${team.teamName} deleted`);
                this.getTeams();
            });
    };

    toggleSelection($event) {
        if($event.checked) {
            this.teams.forEach(team => team.checked = true);
        } else {
            this.teams.forEach(team => team.checked = false);
        }
    }

}
