import { Component, OnInit, Injectable, Inject } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

import { PriorityType } from './priority-type.model';
import { PriorityTypeService } from './priority-type.service';

@Injectable()
@Component({
    templateUrl: './edit-priority-type.component.html'
})
export class EditPriorityTypeComponent implements OnInit {

    public priorityType: PriorityType = {
        priorityTypeid: '',
        priorityTypeName: '',
        description: '',
        defaultPriorityType: false,
        sla: '',
        escalateTo: '',
        timeToResolve: 0,
        checked: false,
    };
    id: string;
    priorityTypeForm: FormGroup;
    defaultPriority: boolean;

    constructor(
        private priorityTypeService: PriorityTypeService,
        private fb: FormBuilder,
        private toastService: ToastrService,
        public dialogRef: MatDialogRef<EditPriorityTypeComponent>,
        @Inject(MAT_DIALOG_DATA) public data: PriorityType) {
        this.priorityType = this.data;
        this.defaultPriority = this.data.defaultPriorityType;
    }

    ngOnInit() {
        this.priorityTypeForm = this.fb.group({
            priorityTypeid: 0,
            name: ['', [Validators.required]],
            description: ['', [Validators.required]],
        })
    }

    updatePriorityType(userForm: NgForm) {
        this.priorityTypeService.updatePriorityType(this.priorityType)
            .subscribe(res => {
                this.toastService.success(`Priority type ${this.priorityType.priorityTypeName} updated`);
                this.dialogRef.close(false);
            });
    }

}
