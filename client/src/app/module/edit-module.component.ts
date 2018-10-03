import { Component, OnInit, Injectable, Inject } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

import { Module } from './module.model';
import { ModuleService } from './module.service';
import { Domain } from '../domain/domain.model';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
import { SelectUserComponent } from '../common/select-user-component';


@Injectable()
@Component({
    templateUrl: './edit-module.component.html'
})
export class EditModuleComponent extends SelectUserComponent {

    public module: Module = {
        moduleId: '',
        moduleName: '',
        description: '',
        moduleOwner: new User(),
        domain: new Domain(),
        checked: false,
    };
    id: string;
    moduleForm: FormGroup;

    constructor(
        protected fb: FormBuilder,
        protected userService: UserService,
        private moduleService: ModuleService,
        private toastService: ToastrService,
        public dialogRef: MatDialogRef<EditModuleComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Module) {
        super(fb, userService);
        this.module = this.data;
    }

    ngOnInit() {
        super.ngOnInit();
        this.userNameForm.get('userNameGroup').setValue(this.module.moduleOwner);
        this.moduleForm = this.fb.group({
            moduleId: 0,
            name: ['', [Validators.required]],
            description: ['', [Validators.required]],
        })
    }

    setOwner(user: User) {
        this.module.moduleOwner = user;
    }

    updateModule(userForm: NgForm) {
        this.moduleService.updateModule(this.module)
            .subscribe(res => {
                this.toastService.success(`User ${this.module.moduleName} updated`);
                this.dialogRef.close(false);
            });
    }

}
