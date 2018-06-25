
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
import { saveAs } from 'file-saver/FileSaver';
import { TokenStorage } from '../login/token.storage';
import { TableConfiguratorComponent } from '../util/table-configurator.component';

@Component({
    selector: 'app-comp',
    templateUrl: './list-error.component.html'
})
export class ListErrorComponent implements OnInit {

    errors: Error[];
    subscribedErrorIds: string[];
    allColumns = ['Checkbox', 'Error Code', 'Message', 'Error Type', 'Batch Type', 'Actions'];
    displayedColumns = this.allColumns;
    dataSource: MatTableDataSource<Error>;
    selectedRowIndex: number = -1;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private router: Router,
        private errorService: ErrorService,
        private toastService: ToastrService,
        private dialog: MatDialog,
        private token: TokenStorage) {
    }

    ngOnInit() {
        this.dialog.afterAllClosed.subscribe(() => {
            this.getErrors();
            this.getSubscribedErrorIds();
        });
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

    getSubscribedErrorIds() {
        let subscribedErrors = this.token.getSubscribedErrorIds();
        if(subscribedErrors) {
            this.subscribedErrorIds = subscribedErrors.split(',');
        } else {
            this.subscribedErrorIds = null;
        }
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
            if (this.selectedErrors.length == 1) {
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

    importErrors(event) {
        this.errorService.importErrors(event.target.files.item(0))
            .subscribe(data => {
                this.toastService.success(`${data} errors imported`);
                this.getErrors();
            });
    }

    exportErrorsInExcel() {
        this.errorService.exportErrorsInExcel()
            .subscribe(res => {
                saveAs(new Blob([res.body]), "err_code.xls");
            });
    }

    exportErrorsInPDF() {
        this.errorService.exportErrorsInPDF()
            .subscribe(res => {
                saveAs(new Blob([res.body]), "err_code.pdf");
            });
    }

    subscribeError(error) {
        this.errorService.subscribeError(error.errid)
            .subscribe(res => { 
                this.token.addSubscribedErrorIds(error.errid);
                this.getSubscribedErrorIds();
                this.toastService.success(`You have subscribed for Error ${error.errcode}`);
            });
    }

    unSubscribeError(error) {
        this.errorService.unSubscribeError(error.errid)
            .subscribe(res => { 
                this.token.removeSubscribedErrorIds(error.errid);
                this.getSubscribedErrorIds();
                this.toastService.success(`You have unsubscribed for Error ${error.errcode}`);
            });
    }

    subscribeErrors() {
        if (this.selectedErrors.length == 0) {
            this.toastService.warning(`Please select an error to subscribe`);
            return;
        }
        let selectedErrorsLength = this.selectedErrors.length;
        let errids = this.selectedErrors.join(",");
        this.errorService.subscribeErrors(errids)
            .subscribe(res => {
                this.token.addSubscribedErrorIds(errids);
                this.getSubscribedErrorIds();
                if (res == 0) {
                    this.toastService.warning(`All selected errors are already subscribed`);
                } else if (res == 1) {
                    this.toastService.success(`1 error subscribed`);
                } else {
                    this.toastService.success(`${res} errors subscribed`);
                }
            }
            );
    }

    unSubscribeErrors() {
        if (this.selectedErrors.length == 0) {
            this.toastService.warning(`Please select an error to un-subscribe`);
            return;
        }
        let selectedErrorsLength = this.selectedErrors.length;
        let errids = this.selectedErrors.join(",");
        this.errorService.unSubscribeErrors(errids)
            .subscribe(res => {
                this.token.removeSubscribedErrorIds(errids);
                this.getSubscribedErrorIds();
                if (res == 0) {
                    this.toastService.warning(`All selected errors are not subscribed`);
                } else if (res == 1) {
                    this.toastService.success(`1 error un-subscribed`);
                } else {
                    this.toastService.success(`${res} errors un-subscribed`);
                }
            });
    }

     //TODO: Repeated n ListUserComponent
    openTableConfigurator() {
        let dialogRef: MatDialogRef<TableConfiguratorComponent>;
        dialogRef = this.dialog.open(TableConfiguratorComponent, {
            data: {'allColumns': this.allColumns, 'displayedColumns': this.displayedColumns},
            width: '200px',
        });
        return dialogRef.afterClosed().subscribe(result => {
            if(result) {
                this.displayedColumns = result;
            }
        });
    }

}
