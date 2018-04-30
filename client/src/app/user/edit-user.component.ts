import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from './user.model';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'; 
import { ToastrService } from 'ngx-toastr';


@Component({
  templateUrl: './edit-user.component.html'
})
export class EditUserComponent implements OnInit {

  firstNameRequired = 'First Name is required.';

  public user: User = {
    id : '',
    firstName : '',
    lastName : '',
    email : ''
  };
  id: number;
  userForm: FormGroup; 

  constructor(
    private http: HttpClient,
    private router: Router, 
    private route: ActivatedRoute,
    private userService: UserService,
    private fb: FormBuilder,
    private toastService: ToastrService ) {
  }

  ngOnInit() {
    this.route.paramMap
      .subscribe(params => {
        this.id = +params.get('id');
      })
    
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

    this.userService.getUser(this.id).subscribe((user) => {
        this.user = user;
    })
  }

  updateUser(userForm: NgForm) {
    //Working -- 
    this.userService.createUser(this.user)
    // Not Working --this.userService.updateUser(this.user)
      .subscribe(res => {
          //let id = res['id'];
          //this.router.navigate(['/contact-detail', id]);
          this.toastService.success('User updated successfully.');
          this.router.navigate(['users']);
        } 
        /*, (error) => {
            alert('EditUserComponent.updateUser --> ' + error);
        } */
      );
  }

}