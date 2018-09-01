
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort, MatDialogRef, MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { ToastrService } from 'ngx-toastr';

import { PriorityType } from './priority-type.model';
import { PriorityTypeService } from './priority-type.service';
import { AddPriorityTypeComponent } from './add-priority-type.component';
import { EditPriorityTypeComponent } from './edit-priority-type.component';
import { ConfirmDeleteComponent } from '../util/confirm-delete.component';
import { ListComponent } from '../common/list.component';

@Component({
    selector: 'app-comp',
    templateUrl: './list-priority-type.component.html'
})
export class ListPriorityTypeComponent extends ListComponent implements OnInit {

    priorityTypes: PriorityType[];
    allColumns = ['Checkbox', 'Name', 'Description', 'Default',  'SLA', 'Escalate To', 'Resolve Time', 'Actions',];
    displayedColumns = ['Checkbox', 'Name', 'Description', 'Default', 'SLA', 'Escalate To', 'Actions'];
    dataSource: MatTableDataSource<PriorityType>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private router: Router,
        private priorityTypeService: PriorityTypeService,
        private toastService: ToastrService,
        protected dialog: MatDialog) {
            super(dialog);
    }

    ngOnInit() {
        this.dialog.afterAllClosed.subscribe(() => {
            this.getPriorityTypes();
        });
    };

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase();
        this.dataSource.filter = filterValue;
    }

    getPriorityTypes() {
        this.priorityTypeService.getPriorityTypes()
            .subscribe(data => {
                this.priorityTypes = data;
                this.dataSource = new MatTableDataSource(data);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            });
    }

    public addPriorityType(): Observable<boolean> {
        let dialogRef: MatDialogRef<AddPriorityTypeComponent>;
        dialogRef = this.dialog.open(AddPriorityTypeComponent, {
            width: '600px',
            height: '320px',
        });
        return dialogRef.afterClosed();
    }

    public editPriorityType(id: string): Observable<boolean> {
        let dialogRef: MatDialogRef<EditPriorityTypeComponent>;
        dialogRef = this.dialog.open(EditPriorityTypeComponent, {
            data: id,
            width: '400px',
        });
        return dialogRef.afterClosed();
    }

    onDeletePriorityType(priorityType: PriorityType) {
        let dialogRef: MatDialogRef<ConfirmDeleteComponent>;
        dialogRef = this.dialog.open(ConfirmDeleteComponent, {
            data: `Are you sure you want to delete priority type ${priorityType.priorityTypeName}?`
        });
        dialogRef.afterClosed().subscribe((ok: boolean) => {
            if (ok) {
                this.deletePriorityType(priorityType);
            }
        });
    }

    deletePriorityType(priorityType: PriorityType): void {
        this.priorityTypeService.deletePriorityType(priorityType)
            .subscribe(data => {
                this.priorityTypes = this.priorityTypes.filter(u => u !== priorityType);
                this.toastService.success(`Priority type ${priorityType.priorityTypeName} deleted`);
                this.getPriorityTypes();
            });
    };

    toggleSelection($event) {
        if($event.checked) {
            this.priorityTypes.forEach(priorityType => priorityType.checked = true);
        } else {
            this.priorityTypes.forEach(priorityType => priorityType.checked = false);
        }
    }

}
