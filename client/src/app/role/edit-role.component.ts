import { Component, OnInit, Injectable, Inject } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

import { Role } from './role.model';
import { RoleService } from './role.service';
import { User } from '../user/user.model';

@Injectable()
@Component({
    templateUrl: './edit-role.component.html'
})
export class EditRoleComponent implements OnInit {

    public role: Role = {
        roleid: '',
        name: '',
        description: '',
        users: new Set<User>(),
        checked: false,
    };
    id: string;
    roleForm: FormGroup;

    constructor(
        private roleService: RoleService,
        private fb: FormBuilder,
        private toastService: ToastrService,
        public dialogRef: MatDialogRef<EditRoleComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Role) {
        this.role = this.data;
    }

    ngOnInit() {
        this.roleForm = this.fb.group({
            roleid: 0,
            name: ['', [Validators.required]],
            description: ['', [Validators.required]],
        })
    }

    updateRole(userForm: NgForm) {
        this.roleService.updateRole(this.role)
            .subscribe(res => {
                this.toastService.success(`User ${this.role.name} updated`);
                this.dialogRef.close(false);
            });
    }

}
