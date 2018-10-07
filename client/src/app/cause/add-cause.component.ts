import { CauseService } from './cause.service';
import { Component, Injectable, Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Cause } from './cause.model';

@Injectable()
@Component({
    templateUrl: './add-cause.component.html'
})
export class AddCauseComponent {

    errid: string;
    errcode: string;
    cause: Cause = new Cause();
    htmlDescription: string = '';
    htmlBankingScenerio: string = '';
    htmlCodeRootCause: string = '';
    htmlDataRootCause: string = '';
    htmlOperationRootCause: string = '';

    displayCodeRootCause: boolean;
    displayDataRootCause: boolean;
    displayOperationRootCause: boolean;

    constructor(
        private toastService: ToastrService,
        private causeService: CauseService,
        public dialogRef: MatDialogRef<AddCauseComponent>,
        @Inject(MAT_DIALOG_DATA) public data: string[]) {
        this.errid = this.data[0];
        this.errcode = this.data[1];
    }

    createCause(): void {
        this.cause.description = this.htmlDescription;
        this.cause.bankingScenerio = this.htmlBankingScenerio;
        this.cause.codeRootCause = this.htmlCodeRootCause;
        this.cause.dataRootCause = this.htmlDataRootCause;
        this.cause.operationRootCause = this.htmlOperationRootCause;
        this.causeService.createCause(this.cause, this.errid)
            .subscribe(data => {
                this.toastService.success(`Solution for ${this.errcode} added`);
                this.dialogRef.close(false);
            });
    };

}
