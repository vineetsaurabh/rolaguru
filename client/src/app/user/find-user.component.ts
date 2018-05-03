import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { User } from './user.model';

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
    private http: HttpClient,
    private userService: UserService) {
  }


  findUserByEmail(email) {
    this.userService.getUser(email).subscribe((user) => {
      this.user = user;
      console.log(user.firstName);
    })
  }

}