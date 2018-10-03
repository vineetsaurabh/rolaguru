
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort, MatDialogRef, MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { ToastrService } from 'ngx-toastr';

import { Module } from './module.model';
import { ModuleService } from './module.service';
import { AddModuleComponent } from './add-module.component';
import { EditModuleComponent } from './edit-module.component';
import { ConfirmDeleteComponent } from '../util/confirm-delete.component';
import { ListComponent } from '../common/list.component';

@Component({
    selector: 'app-comp',
    templateUrl: './list-module.component.html'
})
export class ListModuleComponent extends ListComponent implements OnInit {

    modules: Module[];
    allColumns = ['Checkbox', 'Name', 'Description', 'Owner', 'Actions'];
    displayedColumns = ['Checkbox', 'Name', 'Description', 'Owner', 'Actions'];
    dataSource: MatTableDataSource<Module>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private router: Router,
        private moduleService: ModuleService,
        private toastService: ToastrService,
        protected dialog: MatDialog) {
            super(dialog);
    }

    ngOnInit() {
        this.dialog.afterAllClosed.subscribe(() => {
            this.getModules();
        });
    };

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase();
        this.dataSource.filter = filterValue;
    }

    getModules() {
        this.moduleService.getModules()
            .subscribe(data => {
                this.modules = data;
                this.dataSource = new MatTableDataSource(data);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            });
    }

    public addModule(): Observable<boolean> {
        let dialogRef: MatDialogRef<AddModuleComponent>;
        dialogRef = this.dialog.open(AddModuleComponent, {
            width: '600px',
            height: '460px',
            disableClose: true,
            autoFocus: false,
        });
        return dialogRef.afterClosed();
    }

    public editModule(id: string): Observable<boolean> {
        let dialogRef: MatDialogRef<EditModuleComponent>;
        dialogRef = this.dialog.open(EditModuleComponent, {
            data: id,
            width: '600px',
            height: '460px',
            disableClose: true,
            autoFocus: false,
        });
        return dialogRef.afterClosed();
    }

    onDeleteModule(module: Module) {
        let dialogRef: MatDialogRef<ConfirmDeleteComponent>;
        dialogRef = this.dialog.open(ConfirmDeleteComponent, {
            data: `Are you sure you want to delete module ${module.moduleName}?`
        });
        dialogRef.afterClosed().subscribe((ok: boolean) => {
            if (ok) {
                this.deleteModule(module);
            }
        });
    }

    deleteModule(module: Module): void {
        this.moduleService.deleteModule(module)
            .subscribe(data => {
                this.modules = this.modules.filter(u => u !== module);
                this.toastService.success(`Module ${module.moduleName} deleted`);
                this.getModules();
            });
    };

    toggleSelection($event) {
        if($event.checked) {
            this.modules.forEach(module => module.checked = true);
        } else {
            this.modules.forEach(module => module.checked = false);
        }
    }

}
