
import { EditUserComponent } from './edit-user.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { User } from './user.model';
import { UserService } from './user.service';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource, MatPaginator, MatSort, MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-user',
  templateUrl: './list-user.component.html',
  styles: []
})
export class ListUserComponent implements OnInit {

  users: User[];
  displayedColumns = ['id', 'firstName', 'lastName', 'email', 'actions'];
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private router: Router,
    private userService: UserService,
    private toastService: ToastrService,
    private dialog: MatDialog ) {
  }

  ngOnInit() {
    
  /*
    //Added below to Refresh the Existingtable (via route)
    this.router.routeReuseStrategy.shouldReuseRoute = function(){
        return false;
    };
    this.router.events.subscribe((evt) => {
        if (evt instanceof NavigationEnd) {
            this.router.navigated = false;
            window.scrollTo(0, 0);
        }
    });
    */
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
      .subscribe( data => {
        this.users = data;
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  /* Moved to EditUserComponent
  updateUser(user) {
    this.userService.updateUser(user)
      .subscribe(res => {
          let id = res['id'];
          this.router.navigate(id);
        }, (error) => {
          alert('UserComponent.updateUser --> ' + error);
        }
      );
  } */

  public editUser(id: string): Observable<boolean> {
    let dialogRef: MatDialogRef<EditUserComponent>;
    dialogRef = this.dialog.open(EditUserComponent, {
      data: id,
      width: '600px',
    });
    return dialogRef.afterClosed();
  }

  deleteUser(user: User): void {
    this.userService.deleteUser(user)
      .subscribe( data => {
        this.users = this.users.filter(u => u !== user);
        this.toastService.success('User deleted successfully.');
        this.getUsers();
      })
  };

}
