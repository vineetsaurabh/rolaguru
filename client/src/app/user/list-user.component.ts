
import { EditUserComponent } from './edit-user.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { User } from './user.model';
import { UserService } from './user.service';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource, MatPaginator, MatSort, MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { AddUserComponent } from './add-user.component';

@Component({
    selector: 'app-comp',
    templateUrl: './list-user.component.html',
})
export class ListUserComponent implements OnInit {

    users: User[];
    displayedColumns = ['checked', 'username', 'firstName', 'lastName', 'email', 'actions'];
    dataSource: MatTableDataSource<User>;
    selectedRowIndex: number = -1;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private router: Router,
        private userService: UserService,
        private toastService: ToastrService,
        private dialog: MatDialog) {
    }

    ngOnInit() {
        this.getUsers();
        this.dialog.afterAllClosed.subscribe(() => {
            this.getUsers();
        })
    };

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase();
        this.dataSource.filter = filterValue;
    }

    getUsers() {
        this.userService.getUsers()
            .subscribe(data => {
                this.users = data;
                this.dataSource = new MatTableDataSource(data);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            });
    }

    public addUser(): Observable<boolean> {
        let dialogRef: MatDialogRef<AddUserComponent>;
        dialogRef = this.dialog.open(AddUserComponent, {
            width: '600px',
        });
        return dialogRef.afterClosed();
    }

    public editUser(id: string): Observable<boolean> {
        this.highlight(id);
        let dialogRef: MatDialogRef<EditUserComponent>;
        dialogRef = this.dialog.open(EditUserComponent, {
            data: id,
            width: '600px',
        });
        return dialogRef.afterClosed();
    }

    deleteUser(user: User): void {
        this.highlight(user.userid);
        this.userService.deleteUser(user)
            .subscribe(data => {
                this.users = this.users.filter(u => u !== user);
                this.toastService.success(`User ${user.username} deleted`);
                this.getUsers();
            })
    };

    activateUser(user) {
        user.active = true;
        this.userService.updateUser(user)
            .subscribe(res => {
                this.toastService.success(`User ${user.username} activated`);
            }
            );
    }

    deActivateUser(user) {
        user.active = false;
        this.userService.updateUser(user)
            .subscribe(res => {
                this.toastService.success(`User ${user.username} deactivated`);
            }
            );
    }

    highlight(id) {
        this.selectedRowIndex = id;
    }

    get selectedUsers() {
        return this.users
            .filter(user => user.checked)
            .map(user => user.userid);
    }

    deleteSelectedUsers() {
        if(this.selectedUsers.length == 0) {
            this.toastService.warning(`Please select a user to delete`);
        } else {
            this.userService.deleteUsers(this.selectedUsers)
            .subscribe(res => {
                this.getUsers();
                if(this.selectedUsers.length == 1) {
                    this.toastService.success(`1 user deleted`);
                } else {
                    this.toastService.success(`${this.selectedUsers.length} users deleted`);
                }
            }
            );
        }
    }

}
