import { Component, Injectable, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

import { Domain } from './domain.model';
import { DomainService } from './domain.service';
import { Module } from '../module/module.model';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
import { SelectUserComponent } from '../common/select-user-component';


@Injectable()
@Component({
    templateUrl: './edit-domain.component.html'
})
export class EditDomainComponent extends SelectUserComponent {

    public domain: Domain = {
        domainId: '',
        domainName: '',
        description: '',
        modules: new Set<Module>(),
        domainOwner: new User(),
        defaultDomain: false,
        checked: false,
    };
    id: string;
    domainForm: FormGroup;
    defaultDomain: boolean;

    constructor(
        protected fb: FormBuilder,
        protected userService: UserService,
        private domainService: DomainService,
        private toastService: ToastrService,
        public dialogRef: MatDialogRef<EditDomainComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Domain) {
        super(fb, userService);
        this.domain = this.data;
        this.defaultDomain = this.data.defaultDomain;
    }

    ngOnInit() {
        super.ngOnInit();
        this.userNameForm.get('userNameGroup').setValue(this.domain.domainOwner);
        this.domainForm = this.fb.group({
            domainId: 0,
            name: ['', [Validators.required]],
            description: ['', [Validators.required]],
        })
    }

    setOwner(user: User) {
        this.domain.domainOwner = user;
    }

    updateDomain() {
        this.domainService.updateDomain(this.domain)
            .subscribe(res => {
                this.toastService.success(`Domain ${this.domain.domainName} updated`);
                this.dialogRef.close(false);
            });
    }

}
