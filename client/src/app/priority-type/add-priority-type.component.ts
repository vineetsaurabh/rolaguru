import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

import { PriorityType } from './priority-type.model';
import { PriorityTypeService } from './priority-type.service';

@Component({
    templateUrl: './add-priority-type.component.html'
})
export class AddPriorityTypeComponent {

    priorityType: PriorityType = new PriorityType();

    constructor(
        private router: Router,
        private priorityTypeService: PriorityTypeService,
        private toastService: ToastrService,
        public dialogRef: MatDialogRef<AddPriorityTypeComponent>) {

    }

    createpriorityType(userForm: NgForm): void {
        this.priorityTypeService.createPriorityType(this.priorityType)
            .subscribe(data => {
                this.toastService.success(`Priorty type ${this.priorityType.priorityTypeName} added`);
                this.dialogRef.close(false);
            });
    };

}