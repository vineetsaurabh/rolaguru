import { HttpHeaders } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Error } from './error.model';
import { ErrorService } from './error.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PriorityTypeService } from '../priority-type/priority-type.service';
import { PriorityType } from '../priority-type/priority-type.model';

@Component({
    templateUrl: './add-error.component.html'
})
export class AddErrorComponent {

    error: Error = new Error();
    errorDomainId: string;
    errorDomainName: string;
    htmlDescription: string = '';
	priorityTypes: PriorityType[];
    defaultPriorityType: PriorityType;

    constructor(
        private router: Router,
        private errorService: ErrorService,
        private toastService: ToastrService,
        private priorityTypeService: PriorityTypeService,
        public dialogRef: MatDialogRef<AddErrorComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
            this.errorDomainId = data.domainId;
            this.errorDomainName = data.domainName;
    }
	
	ngOnInit() {
        this.priorityTypeService.getPriorityTypes()
            .subscribe(data => {
                this.priorityTypes = data,
                this.error.priority = data.filter(_ => _.defaultPriorityType)[0].priorityTypeName;
            });
    }

    createError(errorForm: NgForm): void {
        this.error.description = this.htmlDescription;
        this.error.domain = this.errorDomainId;
        this.errorService.createError(this.error)
            .subscribe(data => {
                this.toastService.success(`Error ${this.error.errcode} added`);
                this.dialogRef.close(false);
            });
    };

}
