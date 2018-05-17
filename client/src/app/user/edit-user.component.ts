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
    private router: Router, 
    private route: ActivatedRoute,
    private userService: UserService,
    private fb: FormBuilder,
    private toastService: ToastrService,
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User ) {
    this.user = this.data;
  }

  ngOnInit() {
    /*
    this.route.paramMap
      .subscribe(params => {
        this.id = +params.get('id');
      }) */

    
    
    /*
    if (this.route.snapshot.params["id"]) {  
        this.id = this.route.snapshot.params["id"];  
    } */

    this.userForm = this.fb.group({  
        id: 0,  
        firstName: ['', [Validators.required]],  
        lastName: ['', [Validators.required]],  
        email: ['', [Validators.required]]
    })
  }

  updateUser(userForm: NgForm) {
    //Working -- 
    this.userService.createUser(this.user)
    // Not Working --this.userService.updateUser(this.user)
      .subscribe(res => {
          //let id = res['id'];
          //this.router.navigate(['/contact-detail', id]);
          this.toastService.success(`User ${this.user.username} updated`);
          this.dialogRef.close(false);
          //this.router.navigate(['users']);
        } 
        /*, (error) => {
            console.log('EditUserComponent.updateUser --> ' + error);
        } */
      );
  }

}