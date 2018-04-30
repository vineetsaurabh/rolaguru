import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { User } from './user.model';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './list-user.component.html',
  styles: []
})
export class ListUserComponent implements OnInit {

  users: User[];

  noUserFound = 'There is not any user in the system!';

  constructor(private router: Router, private userService: UserService) {

  }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe( data => {
        this.users = data;
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
      })
  };

}
