
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort, MatDialogRef, MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { ToastrService } from 'ngx-toastr';

import { Role } from './role.model';
import { RoleService } from './role.service';
import { AddRoleComponent } from './add-role.component';
import { EditRoleComponent } from './edit-role.component';
import { ConfirmDeleteComponent } from '../util/confirm-delete.component';
import { ListComponent } from '../common/list.component';

@Component({
    selector: 'app-comp',
    templateUrl: './list-role.component.html'
})
export class ListRoleComponent extends ListComponent implements OnInit {

    roles: Role[];
    allColumns = ['Checkbox', 'Name', 'Description', 'Actions'];
    displayedColumns = ['Checkbox', 'Name', 'Description', 'Actions'];
    dataSource: MatTableDataSource<Role>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private router: Router,
        private roleService: RoleService,
        private toastService: ToastrService,
        protected dialog: MatDialog) {
            super(dialog);
    }

    ngOnInit() {
        this.dialog.afterAllClosed.subscribe(() => {
            this.getRoles();
        });
    };

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase();
        this.dataSource.filter = filterValue;
    }

    getRoles() {
        this.roleService.getRoles()
            .subscribe(data => {
                this.roles = data;
                this.dataSource = new MatTableDataSource(data);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            });
    }

    public addRole(): Observable<boolean> {
        let dialogRef: MatDialogRef<AddRoleComponent>;
        dialogRef = this.dialog.open(AddRoleComponent, {
            width: '600px',
            height: '320px',
            disableClose: true,
            autoFocus: false,
        });
        return dialogRef.afterClosed();
    }

    public editRole(id: string): Observable<boolean> {
        let dialogRef: MatDialogRef<EditRoleComponent>;
        dialogRef = this.dialog.open(EditRoleComponent, {
            data: id,
            width: '400px',
            disableClose: true,
            autoFocus: false,
        });
        return dialogRef.afterClosed();
    }

    onDeleteRole(role: Role) {
        let dialogRef: MatDialogRef<ConfirmDeleteComponent>;
        dialogRef = this.dialog.open(ConfirmDeleteComponent, {
            data: `Are you sure you want to delete user ${role.roleName}?`
        });
        dialogRef.afterClosed().subscribe((ok: boolean) => {
            if (ok) {
                this.deleteRole(role);
            }
        });
    }

    deleteRole(role: Role): void {
        this.roleService.deleteRole(role)
            .subscribe(data => {
                this.roles = this.roles.filter(u => u !== role);
                this.toastService.success(`Role ${role.roleName} deleted`);
                this.getRoles();
            });
    };

    toggleSelection($event) {
        if($event.checked) {
            this.roles.forEach(role => role.checked = true);
        } else {
            this.roles.forEach(role => role.checked = false);
        }
    }

}
