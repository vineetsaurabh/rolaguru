import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import { TokenStorage } from './token.storage';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { UserPreferenceService } from '../user-preference/user-preference.service';

@Component({
  selector: 'app-root',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  errMsg: string = '';

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private authService: AuthService,
    private token: TokenStorage,
    private userService: UserService,
    private userPreferenceService: UserPreferenceService) {
  }

  login(): void {
    this.authService.attemptAuth(this.username, this.password).subscribe(
      data => {
        this.token.saveToken(data.token);
        this.userService.getUserByUsername(this.username)
          .subscribe(user => {
            this.token.saveCurrentUser(user.firstName);
            this.token.saveCurrentUserId(user.userid);
            this.userService.getSubscribedErrorIds()
              .subscribe(subscribedErrIds => {
                this.token.saveSubscribedError(subscribedErrIds.toString());
              });
            this.userPreferenceService.getCurrentUserPreference()
              .subscribe(data => {
                if (data) {
                  this.token.savePagination(data.pagination);
                  this.token.saveErrorTableColumns(data.errorTableColumns);
                }
              })
            this.router.navigate(['homepage']);
          });
      }, (response) => {
        if (response.status == 0) {
          this.errMsg = "Server is down. <br/>Please try again after some time.";
        }
        if (response.status == 500 && response.error.message == "Bad credentials") {
          this.errMsg = "Invalid credential.<br/>Please enter correct username and password.";
        }
      });
  }

}
