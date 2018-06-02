
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { Error } from './error.model';
import { ErrorService } from './error.service';
import { EditErrorComponent } from './edit-error.component';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource, MatPaginator, MatSort, MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { ErrorDetailComponent } from './error-detail.component';
import { AddCauseComponent } from '../cause/add-cause.component';
import { AddErrorComponent } from './add-error.component';
import { ConfirmDeleteComponent } from '../util/confirm-delete.component';

@Component({
    selector: 'app-comp',
    templateUrl: './list-error.component.html'
})
export class ListErrorComponent implements OnInit {

    errors: Error[];
    displayedColumns = ['checked', 'errcode', 'message', 'errortype', 'batchtype', 'actions'];
    dataSource: MatTableDataSource<Error>;
    selectedRowIndex: number = -1;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private router: Router,
        private errorService: ErrorService,
        private toastService: ToastrService,
        private dialog: MatDialog) {
    }

    ngOnInit() {
        this.dialog.afterAllClosed.subscribe(() => {
            this.getErrors();
        })
    };

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase();
        this.dataSource.filter = filterValue;
    }

    getErrors() {
        this.errorService.getErrors()
            .subscribe(data => {
                this.errors = data;
                this.dataSource = new MatTableDataSource(data);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            });
    }

    public addError(): Observable<boolean> {
        let dialogRef: MatDialogRef<AddErrorComponent>;
        dialogRef = this.dialog.open(AddErrorComponent, {
            width: '800px',
        });
        return dialogRef.afterClosed();
    }

    public editError(id: string): Observable<boolean> {
        let dialogRef: MatDialogRef<EditErrorComponent>;
        dialogRef = this.dialog.open(EditErrorComponent, {
            data: id,
            width: '800px',
        });
        return dialogRef.afterClosed();
    }

    onDeleteError(error: Error) {
        let dialogRef: MatDialogRef<ConfirmDeleteComponent>;
        dialogRef = this.dialog.open(ConfirmDeleteComponent, {
            data: `Are you sure you want to delete error ${error.errcode}?`
        });
        dialogRef.afterClosed().subscribe((ok: boolean) => {
            if (ok) {
                this.deleteError(error);
            }
        });
    }

    deleteError(error: Error): void {
        this.errorService.deleteError(error)
            .subscribe(data => {
                this.errors = this.errors.filter(u => u !== error);
                this.toastService.success(`Error ${error.errcode} delete`);
                this.getErrors();
            })
    };

    highlight(id) {
        this.selectedRowIndex = id;
    }

    get selectedErrors() {
        return this.errors
            .filter(error => error.checked)
            .map(error => error.errid);
    }

    onDeleteSelectedErrors() {
        if (this.selectedErrors.length == 0) {
            this.toastService.warning(`Please select an error to delete`);
        } else {
            let dialogRef: MatDialogRef<ConfirmDeleteComponent>;
            if(this.selectedErrors.length == 1) {
                dialogRef = this.dialog.open(ConfirmDeleteComponent, {
                    data: `Are you sure want to delete the selected error?`
                });
            } else {
                dialogRef = this.dialog.open(ConfirmDeleteComponent, {
                    data: `Are you sure want to delete ${this.selectedErrors.length} errors?`
                });
            }
            dialogRef.afterClosed().subscribe((ok: boolean) => {
                if (ok) {
                    this.deleteSelectedErrors();
                }
            });
        }
    }

    deleteSelectedErrors() {
        let selectedErrorsLength = this.selectedErrors.length;
        this.errorService.deleteErrors(this.selectedErrors)
            .subscribe(res => {
                this.getErrors();
                if (selectedErrorsLength == 1) {
                    this.toastService.success(`1 error deleted`);
                } else {
                    this.toastService.success(`${selectedErrorsLength} errors deleted`);
                }
            }
            );
    }

}
