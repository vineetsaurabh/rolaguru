import { Component, Injectable, Inject } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

import { Team } from './team.model';
import { TeamService } from './team.service';
import { User } from '../user/user.model';

@Injectable()
@Component({
    templateUrl: './edit-team.component.html'
})
export class EditTeamComponent {

    public team: Team = {
        teamid: '',
        teamName: '',
        description: '',
        users: new Set<User>(),
        checked: false,
    };
    id: string;
    teamForm: FormGroup;

    constructor(
        private teamService: TeamService,
        private fb: FormBuilder,
        private toastService: ToastrService,
        public dialogRef: MatDialogRef<EditTeamComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Team) {
        this.team = this.data;
    }

    ngOnInit() {
        this.teamForm = this.fb.group({
            teamid: 0,
            name: ['', [Validators.required]],
            description: ['', [Validators.required]],
        })
    }

    updateTeam(userForm: NgForm) {
        this.teamService.updateTeam(this.team)
            .subscribe(res => {
                this.toastService.success(`Team ${this.team.teamName} updated`);
                this.dialogRef.close(false);
            });
    }

}
