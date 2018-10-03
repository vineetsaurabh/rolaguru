import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

import { Module } from './module.model';
import { ModuleService } from './module.service';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
import { SelectUserComponent } from '../common/select-user-component';
import { Domain } from '../domain/domain.model';
import { DomainService } from '../domain/domain.service';

@Component({
    templateUrl: './add-module.component.html'
})
export class AddModuleComponent extends SelectUserComponent {

    module: Module = new Module();
    domains: Domain[];

    constructor(
        protected fb: FormBuilder,
        protected userService: UserService,
        private moduleService: ModuleService,
        private domainService: DomainService,
        private toastService: ToastrService,
        public dialogRef: MatDialogRef<AddModuleComponent>) {
        super(fb, userService);
    }

    ngOnInit() {
        super.ngOnInit();
        this.domainService.getDomains()
            .subscribe(data => {
                this.domains = data;
            });
    }

    setOwner(user: User) {
        this.module.moduleOwner = user;
    }

    createModule(): void {
        this.moduleService.createModule(this.module)
            .subscribe(data => {
                this.toastService.success(`Module ${this.module.moduleName} added`);
                this.dialogRef.close(false);
            });
    };

}