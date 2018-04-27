import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from './user.model';
import { UserService } from './user.service';

@Component({
  templateUrl: './add-user.component.html'
})
export class AddUserComponent {

  user: User = new User();

  firstNameRequired = 'First Name is required.';

  constructor(private router: Router, private userService: UserService) {

  }

  createUser(userForm: NgForm): void {
    this.userService.createUser(this.user)
        .subscribe( data => {
          userForm.reset();
          alert("User created successfully.");
        });

  };

}
