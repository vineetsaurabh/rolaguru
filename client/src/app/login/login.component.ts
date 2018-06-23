import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { TokenStorage } from './token.storage';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private authService: AuthService,
    private token: TokenStorage,
    private userService: UserService) {
  }

  username: string;
  password: string;

  login(): void {
    this.authService.attemptAuth(this.username, this.password).subscribe(
      data => {
        this.token.saveToken(data.token);
        this.userService.getUserByUsername(this.username)
          .subscribe( user => {
            this.token.saveCurrentUser(user.firstName);
            this.token.saveCurrentUserId(user.userid);
            this.userService.getSubscribedErrors()
                .subscribe( subscribedErrIds => {
                    this.token.saveSubscribedError(subscribedErrIds.toString());
                });
            this.router.navigate(['homepage']);
        }); 
      }, (error) => {
        console.log("Login Error", error);
    }
    )
  }

}
