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
    errorCategoryId: string;
    errorCategoryName: string;

    constructor(
        private router: Router,
        private errorService: ErrorService,
        private toastService: ToastrService,
        public dialogRef: MatDialogRef<AddErrorComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
            this.errorCategoryId = data.category;
            this.errorCategoryName = data.categoryName;
    }

    createError(errorForm: NgForm): void {
        this.error.category = this.errorCategoryId;
        this.errorService.createError(this.error)
            .subscribe(data => {
                this.toastService.success(`Error ${this.error.errcode} added`);
                this.dialogRef.close(false);
            });
    };

}
