import { Component, Injectable, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { TokenStorage } from "../login/token.storage";
import { UserPreferenceService } from "../user-preference/user-preference.service";
import { UserPreference } from "../user-preference/user-preference.model";

@Injectable()
@Component({
    templateUrl: './table-configurator.component.html'
})
export class TableConfiguratorComponent {

    displayedColumns: DisplayedColumn[] = new Array;
    allColumns: string[];

    userPreference: UserPreference = new UserPreference();
    listErrorTableColumns: string;

    constructor(
        private token: TokenStorage,
        private userPreferenceService: UserPreferenceService,
        public dialogRef: MatDialogRef<TableConfiguratorComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        let displayedColumns = data.displayedColumns;
        this.allColumns = data.allColumns;
        if (this.allColumns) {
            for (let i = 0; i < this.allColumns.length; i++) {
                this.displayedColumns.push({ value: this.allColumns[i], checked: displayedColumns.indexOf(this.allColumns[i]) > -1 });
            }
        }
    }

    ngOnInit() {
        this.userPreferenceService.getCurrentUserPreference()
            .subscribe(data => {
                if (data) {
                    this.userPreference = data;
                }
            });
    }

    get selectedColumns() {
        return this.displayedColumns.filter(column => column.checked).map(column => column.value);
    }

    submit(): void {
        this.userPreference.errorTableColumns = this.selectedColumns.join(",");
        this.userPreferenceService.updateUserPreference(this.userPreference)
            .subscribe(data => {
                if (data) {
                    this.token.saveErrorTableColumns(data.errorTableColumns);
                }
            });
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