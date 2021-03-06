import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort, MatDialogRef, MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { saveAs } from 'file-saver/FileSaver';
import { ToastrService } from 'ngx-toastr';

import { Error } from './error.model';
import { ErrorService } from './error.service';
import { EditErrorComponent } from './edit-error.component';
import { AddErrorComponent } from './add-error.component';
import { ConfirmDeleteComponent } from '../util/confirm-delete.component';
import { TokenStorage } from '../login/token.storage';
import { ListComponent } from '../common/list.component';

@Component({
    selector: 'app-comp',
    templateUrl: './list-error.component.html'
})
export class ListErrorComponent extends ListComponent {

    errors: Error[];
    subscribedErrorIds: string[];
    allColumns = ['SolnAvail', 'Checkbox', 'Error Code', 'Description', 'Module', 'Operation', 'Priority', 'Severity', 'Frequency', 'Attachments', 'Actions'];
    displayedColumns = ['SolnAvail', 'Checkbox', 'Error Code', 'Description', 'Module', 'Operation', 'Priority', 'Severity', 'Frequency', 'Actions'];
    dataSource: MatTableDataSource<any>;
    errorDomainId: string;
    errorDomainName: string;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        protected router: Router,
        protected route: ActivatedRoute,
        protected errorService: ErrorService,
        protected toastService: ToastrService,
        protected dialog: MatDialog,
        protected token: TokenStorage) {
        super(token, dialog);
    }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.errorDomainId = params.domainId,
                this.errorDomainName = params.domainName
        });
        this.dialog.afterAllClosed.subscribe(() => {
            this.getAllErrorsOfDomian();
            this.getSubscribedErrorIds();
        });
        if (this.token.getErrorTableColumns()) {
            this.displayedColumns = [];
            this.token.getErrorTableColumns().split(",").forEach(element => {
                this.displayedColumns.push(element);
            });
        }
    };

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase();
        this.dataSource.filter = filterValue;
    }

    getAllErrorsOfDomian() {
        this.errorService.getAllErrorsOfDomian(this.errorDomainId)
            .subscribe(data => {
                this.errors = data;
                this.dataSource = new MatTableDataSource(data);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            });
    }

    getSubscribedErrorIds() {
        let subscribedErrors = this.token.getSubscribedErrorIds();
        if (subscribedErrors) {
            this.subscribedErrorIds = subscribedErrors.split(',');
        } else {
            this.subscribedErrorIds = null;
        }
    }

    public addError(): Observable<boolean> {
        let dialogRef: MatDialogRef<AddErrorComponent>;
        dialogRef = this.dialog.open(AddErrorComponent, {
            data: {
                domainId: this.errorDomainId,
                domainName: this.errorDomainName
            },
            width: '800px',
            height: '600px',
            disableClose: true,
            autoFocus: false,
        });
        return dialogRef.afterClosed();
    }

    public editError(id: string): Observable<boolean> {
        let dialogRef: MatDialogRef<EditErrorComponent>;
        dialogRef = this.dialog.open(EditErrorComponent, {
            data: id,
            width: '800px',
            height: '620px',
            disableClose: true,
            autoFocus: false,
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
                this.getAllErrorsOfDomian();
            })
    };

    get selectedErrors() {
        return this.errors
            .filter(error => error.checked)
            .map(error => error.errid);
    }

    onDeleteSelectedErrors() {
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

    deleteSelectedErrors() {
        let selectedErrorsLength = this.selectedErrors.length;
        this.errorService.deleteErrors(this.selectedErrors)
            .subscribe(res => {
                this.getAllErrorsOfDomian();
                if (selectedErrorsLength == 1) {
                    this.toastService.success(`1 error deleted`);
                } else {
                    this.toastService.success(`${selectedErrorsLength} errors deleted`);
                }
            }
            );
    }

    importErrors(event) {
        this.errorService.importErrors(event.target.files.item(0), this.errorDomainId)
            .subscribe(data => {
                this.toastService.success(`${data} ${this.errorDomainName} errors imported`);
                this.getAllErrorsOfDomian();
            });
    }

    exportErrorsInExcel() {
        this.errorService.exportErrorsInExcel()
            .subscribe(res => {
                saveAs(new Blob([res.body]), `ErrorList.xls`);
            });
    }

    exportErrorsInPDF() {
        this.errorService.exportErrorsInPDF()
            .subscribe(res => {
                saveAs(new Blob([res.body]), `ErrorList.pdf`);
            });
    }

    subscribeError(error) {
        this.errorService.subscribeError(error.errid)
            .subscribe(res => {
                this.token.addSubscribedErrorIds(error.errid);
                this.getSubscribedErrorIds();
                this.toastService.success(`You have subscribed for ${this.errorDomainName} Error ${error.errcode}`);
            });
    }

    unSubscribeError(error) {
        this.errorService.unSubscribeError(error.errid)
            .subscribe(res => {
                this.token.removeSubscribedErrorIds("" + error.errid);
                this.getSubscribedErrorIds();
                this.toastService.success(`You have unsubscribed for Error ${error.errcode}`);
            });
    }

    subscribeErrors() {
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
            });
    }

    unSubscribeErrors() {
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

    toggleSelection($event) {
        if ($event.checked) {
            this.errors.forEach(error => error.checked = true);
        } else {
            this.errors.forEach(error => error.checked = false);
        }
    }

    download(file) {
        this.errorService.downloadFile(file.errorDocId)
            .subscribe(res => {
                saveAs(res.body, file.filename);
            });
    }

    truncateHTML(text: string): string {
        let charlimit = 60;
        if (!text || text.length <= charlimit) {
            return text;
        }
        let without_html = text.replace(/<(?:.|\n)*?>/gm, '');
        let shortened = without_html.substring(0, charlimit) + "...";
        return shortened;
    }

    disableAction() {
        if (this.errors) {
            return !this.errors.some(_ => _.checked);
        }
        return true;
    }

}
