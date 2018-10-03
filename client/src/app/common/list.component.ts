import { MatDialogRef, MatDialog } from "@angular/material";
import { TableConfiguratorComponent } from "../util/table-configurator.component";
import { Component } from "@angular/core";

@Component({})
export class ListComponent {

    allColumns = [];
    displayedColumns = this.allColumns;

    constructor(
        protected dialog: MatDialog) {
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