import { MatDialogRef, MatDialog } from "@angular/material";
import { TableConfiguratorComponent } from "../util/table-configurator.component";
import { Component } from "@angular/core";

import { TokenStorage } from "../login/token.storage";

@Component({})
export class ListComponent {

    allColumns = [];
    displayedColumns = this.allColumns;

    pageSizeOptions = [10, 25, 50, 100];

    constructor(
        protected token: TokenStorage,
        protected dialog: MatDialog) {
            if(this.token.getPagination()) {
                this.pageSizeOptions = [];
                this.token.getPagination().split(",").forEach(element => {
                    this.pageSizeOptions.push(+element);
                });
            }
    }

    openTableConfigurator() {
        let dialogRef: MatDialogRef<TableConfiguratorComponent>;
        dialogRef = this.dialog.open(TableConfiguratorComponent, {
            data: { 'allColumns': this.allColumns, 'displayedColumns': this.displayedColumns },
            width: '200px',
            maxHeight: '600px',
        });
        return dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.displayedColumns = result;
            }
        });
    }

    printErrors() {
        window.print();
    }

}