import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from './user.model';
import { UserService } from './user.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material';

@Component({
  templateUrl: './add-user.component.html'
})
export class AddUserComponent {

  user: User = new User();

  firstNameRequired = 'First Name is required.';

  constructor(
    private router: Router,
    private userService: UserService, 
    private toastService: ToastrService,
    public dialogRef: MatDialogRef<AddUserComponent>) {

  }

  createUser(userForm: NgForm): void {
    this.user.active = false;
    this.userService.createUser(this.user)
        .subscribe( data => {
          this.toastService.success(`User ${this.user.username} added`);
          /*userForm.reset();
          this.router.navigate(['listUsers']); */
          this.dialogRef.close(false);
        });
  };

}
