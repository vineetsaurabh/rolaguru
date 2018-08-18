import { Component, OnInit, Injectable, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Error } from './error.model';
import { HttpClient } from '@angular/common/http';
import { ErrorService } from './error.service';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA, MatRadioChange } from '@angular/material';
import { Cause } from '../cause/cause.model';

@Injectable()
@Component({
    templateUrl: './edit-error.component.html'
})
export class EditErrorComponent implements OnInit {

    public error: Error = {
        errid: '',
        domain: '',
        errcode: '',
        description: '',
        module: '',
        operation: '',
        severity: 0,
        frequency: 0,
        causes: new Set<Cause>(),
        checked: false,
        files: null
    };
    errorForm: FormGroup;

    constructor(
        private errorService: ErrorService,
        private fb: FormBuilder,
        private toastService: ToastrService,
        public dialogRef: MatDialogRef<EditErrorComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Error) {
        this.error = this.data;
    }

    ngOnInit() {
        this.errorForm = this.fb.group({
            id: '',
            errCode: ['', [Validators.required]],
            description: ['', [Validators.required]],
            module: ['', [Validators.required]],
            operation: ['', [Validators.required]]
        });
    }

    updateError(errorForm: NgForm) {
        this.errorService.updateError(this.error)
            .subscribe(res => {
                this.toastService.success(`Error ${this.error.errcode} updated`);
                this.dialogRef.close(false);
            });
    }

}
