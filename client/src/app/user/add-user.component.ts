import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

import { User } from './user.model';
import { UserService } from './user.service';

@Component({
    templateUrl: './add-user.component.html'
})
export class AddUserComponent {

    user: User = new User();

    constructor(
        private router: Router,
        private userService: UserService,
        private toastService: ToastrService,
        public dialogRef: MatDialogRef<AddUserComponent>) {

    }

    createUser(userForm: NgForm): void {
        this.userService.createUser(this.user)
            .subscribe(data => {
                this.toastService.success(`User ${this.user.username} added`);
                this.dialogRef.close(false);
            });
    };

}
