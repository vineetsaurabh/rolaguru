import { Component, Input, Inject, Optional } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material";

@Component({
    selector: 'delete-confirm-dialog',
    templateUrl: './confirm-delete.component.html'
})
export class ConfirmDeleteComponent {

    title = "Confirm Delete";
    message = '';

    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
        this.message = data;
    }

}