import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

import { Role } from './role.model';
import { RoleService } from './role.service';

@Component({
    templateUrl: './add-role.component.html'
})
export class AddRoleComponent {

    role: Role = new Role();

    constructor(
        private router: Router,
        private roleService: RoleService,
        private toastService: ToastrService,
        public dialogRef: MatDialogRef<AddRoleComponent>) {

    }

    createRole(userForm: NgForm): void {
        this.roleService.createRole(this.role)
            .subscribe(data => {
                this.toastService.success(`User ${this.role.name} added`);
                this.dialogRef.close(false);
            });
    };

}