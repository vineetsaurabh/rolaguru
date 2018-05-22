import { Component, OnInit, Injectable, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from './user.model';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'; 
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Injectable()
@Component({
  templateUrl: './edit-user.component.html'
})
export class EditUserComponent implements OnInit {

  public user: User = {
    userid : '',
    username : '',
    password : '',
    firstName : '',
    lastName : '',
    email : '',
    active : false
  };
  id: string;
  userForm: FormGroup; 

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private toastService: ToastrService,
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User ) {
    this.user = this.data;
  }

  ngOnInit() {
    this.userForm = this.fb.group({  
        id: 0,  
        firstName: ['', [Validators.required]],  
        lastName: ['', [Validators.required]],  
        email: ['', [Validators.required]]
    })
  }

  updateUser(userForm: NgForm) {
    this.userService.updateUser(this.user)
      .subscribe(res => {
          //let id = res['id'];
          this.toastService.success(`User ${this.user.username} updated`);
          this.dialogRef.close(false);
        }
      );
  }

}
