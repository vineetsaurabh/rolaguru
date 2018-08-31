import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

import { Team } from './team.model';
import { TeamService } from './team.service';

@Component({
    templateUrl: './add-team.component.html'
})
export class AddTeamComponent {

    team: Team = new Team();

    constructor(
        private router: Router,
        private teamService: TeamService,
        private toastService: ToastrService,
        public dialogRef: MatDialogRef<AddTeamComponent>) {

    }

    createTeam(userForm: NgForm): void {
        this.teamService.createTeam(this.team)
            .subscribe(data => {
                this.toastService.success(`User ${this.team.teamName} added`);
                this.dialogRef.close(false);
            });
    };

}