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
    id : '',
    firstName : '',
    lastName : '',
    email : ''
  };

  constructor(
    private router: Router,
    private userService: UserService) {
  }


  findUserByEmail() {
    this.userService.getUserByEmail(this.user.email)
      .subscribe( data => {
        this.user = data;
        this.router.navigate(['findUser/'+this.user.id]);
    });
  }

}