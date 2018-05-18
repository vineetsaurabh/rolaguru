import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  constructor(private router : Router) {
  }

  username: string = '';
  password: string = '';

  login() : void {
    if(this.username == 'admin' && this.password == 'admin'){
     this.router.navigate(["homepage"]);
    } else {
      console.log("Invalid credentials");
    }
  }
}