import { Component, Injectable, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Injectable()
@Component({
    templateUrl: './table-configurator.component.html'
})
export class TableConfiguratorComponent {

    displayedColumns: DisplayedColumn[] = new Array;
    allColumns : string[];

    constructor(
        public dialogRef: MatDialogRef<TableConfiguratorComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        let displayedColumns = data.displayedColumns;
        this.allColumns = data.allColumns;
        if(this.allColumns) {
            for(let i=0; i<this.allColumns.length; i++) {
                this.displayedColumns.push({value: this.allColumns[i], checked: displayedColumns.indexOf(this.allColumns[i]) > -1 });
            }
        }
    }

    get selectedColumns() {
        return this.displayedColumns.filter(column => column.checked).map(column => column.value);
    }

    submit(): void {
        this.dialogRef.close(this.selectedColumns);
    }

    reset(): void {
        this.dialogRef.close(this.allColumns);
    }

}

class DisplayedColumn {
    checked: boolean;
    value: string;
}