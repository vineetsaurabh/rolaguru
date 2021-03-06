import { Component, Injectable, Inject } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

import { Error } from './error.model';
import { ErrorService } from './error.service';
import { Cause } from '../cause/cause.model';
import { PriorityTypeService } from '../priority-type/priority-type.service';
import { PriorityType } from '../priority-type/priority-type.model';
import { Module } from '../module/module.model';
import { Domain } from '../domain/domain.model';

@Injectable()
@Component({
    templateUrl: './edit-error.component.html'
})
export class EditErrorComponent {

    public error: Error = {
        errid: '',
        domain: new Domain(),
        errcode: '',
        description: '',
        module: new Module(),
        operation: '',
        priority: '',
        severity: 0,
        frequency: 0,
        causes: new Set<Cause>(),
        checked: false,
        files: null,
        createdTimestamp: null,
        modifiedTimestamp: null,
        user: null
    };
    errorForm: FormGroup;
    priorityTypes: PriorityType[];

    constructor(
        private errorService: ErrorService,
        private fb: FormBuilder,
        private toastService: ToastrService,
        private priorityTypeService: PriorityTypeService,
        public dialogRef: MatDialogRef<EditErrorComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Error) {
        this.error = this.data;
        this.error.domain.modules.forEach(m => {
            if (m.moduleId === this.error.module.moduleId) {
                this.error.module = m;
            }
        });
    }

    ngOnInit() {
        this.errorForm = this.fb.group({
            errCode: ['', [Validators.required]],
            description: ['', [Validators.required]]
        });
        this.priorityTypeService.getPriorityTypes()
            .subscribe(data => {
                this.priorityTypes = data
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
