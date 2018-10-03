
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort, MatDialogRef, MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { ToastrService } from 'ngx-toastr';

import { Domain } from './domain.model';
import { DomainService } from './domain.service';
import { AddDomainComponent } from './add-domain.component';
import { EditDomainComponent } from './edit-domain.component';
import { ConfirmDeleteComponent } from '../util/confirm-delete.component';
import { ListComponent } from '../common/list.component';

@Component({
    selector: 'app-comp',
    templateUrl: './list-domain.component.html'
})
export class ListDomainComponent extends ListComponent {

    domains: Domain[];
    allColumns = ['Checkbox', 'Name', 'Description', 'Default', 'Owner', 'Modules', 'Actions'];
    displayedColumns = ['Checkbox', 'Name', 'Description', 'Default', 'Owner', 'Modules', 'Actions'];
    dataSource: MatTableDataSource<Domain>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private router: Router,
        private domainService: DomainService,
        private toastService: ToastrService,
        protected dialog: MatDialog) {
            super(dialog);
    }

    ngOnInit() {
        this.dialog.afterAllClosed.subscribe(() => {
            this.getDomains();
        });
    };

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase();
        this.dataSource.filter = filterValue;
    }

    getDomains() {
        this.domainService.getDomains()
            .subscribe(data => {
                this.domains = data;
                this.dataSource = new MatTableDataSource(data);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            });
    }

    public addDomain(): Observable<boolean> {
        let dialogRef: MatDialogRef<AddDomainComponent>;
        dialogRef = this.dialog.open(AddDomainComponent, {
            width: '600px',
            height: '400px',
            disableClose: true,
            autoFocus: false,
        });
        return dialogRef.afterClosed();
    }

    public editDomain(id: string): Observable<boolean> {
        let dialogRef: MatDialogRef<EditDomainComponent>;
        dialogRef = this.dialog.open(EditDomainComponent, {
            data: id,
            width: '600px',
            height: '400px',
            disableClose: true,
            autoFocus: false,
        });
        return dialogRef.afterClosed();
    }

    onDeleteDomain(domain: Domain) {
        let dialogRef: MatDialogRef<ConfirmDeleteComponent>;
        dialogRef = this.dialog.open(ConfirmDeleteComponent, {
            data: `Are you sure you want to delete domain ${domain.domainName}?`
        });
        dialogRef.afterClosed().subscribe((ok: boolean) => {
            if (ok) {
                this.deleteDomain(domain);
            }
        });
    }

    deleteDomain(domain: Domain): void {
        this.domainService.deleteDomain(domain)
            .subscribe(data => {
                this.domains = this.domains.filter(u => u !== domain);
                this.toastService.success(`Domain ${domain.domainName} deleted`);
                this.getDomains();
            });
    };

    toggleSelection($event) {
        if($event.checked) {
            this.domains.forEach(domain => domain.checked = true);
        } else {
            this.domains.forEach(domain => domain.checked = false);
        }
    }

}
