import { HttpHeaders } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Error } from './error.model';
import { ErrorService } from './error.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    templateUrl: './add-error.component.html'
})
export class AddErrorComponent {

    error: Error = new Error();
    errorModuleId: string;
    errorModuleName: string;

    constructor(
        private router: Router,
        private errorService: ErrorService,
        private toastService: ToastrService,
        public dialogRef: MatDialogRef<AddErrorComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
            this.errorModuleId = data.moduleId;
            this.errorModuleName = data.moduleName;
    }

    createError(errorForm: NgForm): void {
        this.error.module = this.errorModuleId;
        this.errorService.createError(this.error)
            .subscribe(data => {
                this.toastService.success(`Error ${this.error.errcode} added`);
                this.dialogRef.close(false);
            });
    };

}
