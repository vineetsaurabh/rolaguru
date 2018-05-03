import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from './user.model';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';


@Component({
  templateUrl: './user-detail.component.html'
})
export class UserDetailComponent implements OnInit {

  objectKeys = Object.keys;
  items = { };
  id: number;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private userService: UserService ) {
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

    this.userService.getUser(this.id).subscribe((user) => {
        this.objectKeys = Object.keys;
        this.items = { 'First Name' : user.firstName, 'Last Name' : user.lastName, 'Email ID' : user.email };
        console.log(user.email);
    })
  }

}