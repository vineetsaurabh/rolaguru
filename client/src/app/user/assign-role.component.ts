import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { Inject, Injectable, Component, ViewChild } from "@angular/core";
import { ToastrService } from "ngx-toastr";

import { Role } from "../role/role.model";
import { RoleService } from "../role/role.service";
import { User } from "./user.model";
import { UserService } from "./user.service";

@Injectable()
@Component({
    templateUrl: './assign-role.component.html'
})
export class AssignRoleComponent {

    users: User[];
    roles: Role[];

    allColumns = ['Checkbox', 'Name', 'Description'];
    displayedColumns = ['Checkbox', 'Name', 'Description'];
    dataSource: MatTableDataSource<Role>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private userService: UserService,
        private roleService: RoleService,
        private toastService: ToastrService,
        public dialogRef: MatDialogRef<AssignRoleComponent>,
        @Inject(MAT_DIALOG_DATA) public data: User[]) {
        this.users = this.data;
    }

    ngOnInit() {
        this.getRoles();
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

    get selectedRoles() {
        return this.roles
            .filter(role => role.checked);
    }

    assignRoles() {
        this.users.forEach(user => 
            (user.roles = [], this.selectedRoles.forEach(role => user.roles.push(role))));
        this.userService.assignRoles(this.users)
            .subscribe(res => {
                this.toastService.success(`Roles assigned`);
                this.dialogRef.close(false);
            });
    }

}