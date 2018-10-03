import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

import { Domain } from './domain.model';
import { DomainService } from './domain.service';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
import { SelectUserComponent } from '../common/select-user-component';

@Component({
    templateUrl: './add-domain.component.html'
})
export class AddDomainComponent extends SelectUserComponent {

    domain: Domain = new Domain();

    constructor(
        protected fb: FormBuilder,
        protected userService: UserService,
        private domainService: DomainService,
        private toastService: ToastrService,
        public dialogRef: MatDialogRef<AddDomainComponent>) {
        super(fb, userService);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    setOwner(user: User) {
        this.domain.domainOwner = user;
    }

    createDomain(): void {
        this.domainService.createDomain(this.domain)
            .subscribe(data => {
                this.toastService.success(`Domain ${this.domain.domainName} added`);
                this.dialogRef.close(false);
            });
    };

}