
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort, MatDialogRef, MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { ToastrService } from 'ngx-toastr';

import { User } from './user.model';
import { UserService } from './user.service';
import { AddUserComponent } from './add-user.component';
import { ConfirmDeleteComponent } from '../util/confirm-delete.component';
import { ListComponent } from '../common/list.component';
import { AssignRoleComponent } from './assign-role.component';
import { AssignTeamComponent } from './assign-team.component';
import { EditUserComponent } from './edit-user.component';
import { TokenStorage } from '../login/token.storage';

@Component({
    selector: 'app-comp',
    templateUrl: './list-user.component.html'
})
export class ListUserComponent extends ListComponent {

    users: User[];
    allColumns = ['Checkbox', 'Name', 'DateOfBirth', 'Email', 'Phone', 'Expertise', 'Roles', 'Teams', 'Address', 'Actions'];
    displayedColumns = ['Checkbox', 'Name', 'Email', 'Phone', 'Expertise', 'Roles', 'Teams', 'Actions'];
    dataSource: MatTableDataSource<User>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private userService: UserService,
        private toastService: ToastrService,
        protected token: TokenStorage,
        protected dialog: MatDialog) {
        super(token, dialog);
    }

    ngOnInit() {
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
            width: '500px',
            height: '600px',
            disableClose: true,
            autoFocus: false,
        });
        return dialogRef.afterClosed();
    }

    public editUser(id: string): Observable<boolean> {
        let dialogRef: MatDialogRef<EditUserComponent>;
        dialogRef = this.dialog.open(EditUserComponent, {
            data: id,
            width: '400px',
            disableClose: true,
            autoFocus: false,
        });
        return dialogRef.afterClosed();
    }

    onDeleteUser(user: User) {
        let dialogRef: MatDialogRef<ConfirmDeleteComponent>;
        dialogRef = this.dialog.open(ConfirmDeleteComponent, {
            data: `Are you sure you want to delete user ${user.firstName}?`
        });
        dialogRef.afterClosed().subscribe((ok: boolean) => {
            if (ok) {
                this.deleteUser(user);
            }
        });
    }

    deleteUser(user: User): void {
        this.userService.deleteUser(user)
            .subscribe(data => {
                this.users = this.users.filter(u => u !== user);
                this.toastService.success(`User ${user.username} deleted`);
                this.getUsers();
            });
    };

    activateUser(user) {
        user.active = true;
        this.userService.updateUser(user)
            .subscribe(res => {
                this.toastService.success(`User ${user.username} activated`);
            });
    }

    deActivateUser(user) {
        user.active = false;
        this.userService.updateUser(user)
            .subscribe(res => {
                this.toastService.success(`User ${user.username} deactivated`);
            });
    }

    get selectedUserIds() {
        return this.users
            .filter(user => user.checked)
            .map(user => user.userid);
    }

    get selectedUsers() {
        return this.users
            .filter(user => user.checked);
    }

    onDeleteSelectedUsers() {
        if (this.selectedUserIds.length == 0) {
            this.toastService.warning(`Please select a user to delete`);
        } else {
            let dialogRef: MatDialogRef<ConfirmDeleteComponent>;
            if (this.selectedUserIds.length == 1) {
                dialogRef = this.dialog.open(ConfirmDeleteComponent, {
                    data: `Are you sure want to delete the selected user?`
                });
            } else {
                dialogRef = this.dialog.open(ConfirmDeleteComponent, {
                    data: `Are you sure want to delete ${this.selectedUserIds.length} users?`
                });
            }
            dialogRef.afterClosed().subscribe((ok: boolean) => {
                if (ok) {
                    this.deleteSelectedUsers();
                }
            });
        }
    }

    deleteSelectedUsers() {
        let selectedUsersLength = this.selectedUserIds.length;
        this.userService.deleteUsers(this.selectedUserIds)
            .subscribe(res => {
                this.getUsers();
                if (selectedUsersLength == 1) {
                    this.toastService.success(`1 user deleted`);
                } else {
                    this.toastService.success(`${selectedUsersLength} users deleted`);
                }
            });
    }

    activateSelectedUsers() {
        if (this.selectedUsers.length == 0) {
            this.toastService.warning(`Please select a user to activate`);
        } else {
            this.selectedUsers.forEach(user => {
                if (user.active == false) {
                    user.active = true;
                    this.userService.updateUser(user);
                }
            });
        }
    }

    deactivateSelectedUsers() {
        if (this.selectedUsers.length == 0) {
            this.toastService.warning(`Please select a user to deactivate`);
        } else {
            this.selectedUsers.forEach(user => {
                if (user.active == true) {
                    user.active = false;
                    this.userService.updateUser(user);
                }
            });
        }
    }

    toggleSelection($event) {
        if ($event.checked) {
            this.users.forEach(user => user.checked = true);
        } else {
            this.users.forEach(user => user.checked = false);
        }
    }

    assignRoles(): Observable<boolean> {
        let dialogRef: MatDialogRef<AssignRoleComponent>;
        dialogRef = this.dialog.open(AssignRoleComponent, {
            data: this.selectedUsers,
            width: '800px',
            height: '600px',
            disableClose: true,
            autoFocus: false,
        });
        return dialogRef.afterClosed();
    }

    assignTeams(): Observable<boolean> {
        let dialogRef: MatDialogRef<AssignTeamComponent>;
        dialogRef = this.dialog.open(AssignTeamComponent, {
            data: this.selectedUsers,
            width: '800px',
            height: '600px',
            disableClose: true,
            autoFocus: false,
        });
        return dialogRef.afterClosed();
    }

    disableAction() {
        if (this.users) {
            return !this.users.some(_ => _.checked);
        }
        return true;
    }

}
