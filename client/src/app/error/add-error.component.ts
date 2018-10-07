import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

import { Error } from './error.model';
import { ErrorService } from './error.service';
import { PriorityTypeService } from '../priority-type/priority-type.service';
import { PriorityType } from '../priority-type/priority-type.model';
import { DomainService } from '../domain/domain.service';

@Component({
    templateUrl: './add-error.component.html'
})
export class AddErrorComponent {

    error: Error = new Error();
    domainId: number;
    priorityTypes: PriorityType[];
    defaultPriorityType: PriorityType;

    constructor(
        private router: Router,
        private errorService: ErrorService,
        private toastService: ToastrService,
        private priorityTypeService: PriorityTypeService,
        private domainService: DomainService,
        public dialogRef: MatDialogRef<AddErrorComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.domainId = data.domainId;
    }

    ngOnInit() {
        this.domainService.getDomain(this.domainId)
            .subscribe(data => {
                this.error.domain = data;
            });
        this.priorityTypeService.getPriorityTypes()
            .subscribe(data => {
                this.priorityTypes = data,
                    this.error.priority = data.filter(_ => _.defaultPriorityType)[0].priorityTypeName;
            });
    }

    createError(errorForm: NgForm): void {
        this.errorService.createError(this.error)
            .subscribe(data => {
                this.toastService.success(`Error ${this.error.errcode} added`);
                this.dialogRef.close(false);
            });
    };

}
