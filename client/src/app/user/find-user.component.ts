import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { User } from './user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'user-detail',
  templateUrl: './find-user.component.html',
  styles: []
})
export class FindUserComponent {

  public user: User = {
    userid : '',
    username : '',
    password : '',
    firstName : '',
    lastName : '',
    email : '',
    active : false,
    checked: false,
    picture: null,
  };

  constructor(
    private router: Router,
    private userService: UserService) {
  }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    }
  }

  findUserByEmail() {
    this.userService.getUserByEmail(this.user.email)
      .subscribe( data => {
        this.user = data;
        this.router.navigate(['findUser/'+this.user.userid]);
    });
  }

}
