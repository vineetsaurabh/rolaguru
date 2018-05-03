import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { User } from './user.model';
import { UserService } from './user.service';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-user',
  templateUrl: './list-user.component.html',
  styles: []
})
export class ListUserComponent implements OnInit {

  users: User[];
  displayedColumns = ['firstName', 'lastName', 'email', 'actions'];
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private router: Router,
    private userService: UserService,
    private toastService: ToastrService ) {
  }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe( data => {
        this.users = data;
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });

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
  };

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
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

  deleteUser(user: User): void {
    this.userService.deleteUser(user)
      .subscribe( data => {
        this.users = this.users.filter(u => u !== user);
        this.toastService.success('User deleted successfully.');
      })
  };

}
