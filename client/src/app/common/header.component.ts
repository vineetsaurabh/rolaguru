import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TokenStorage } from '../login/token.storage';
import { AuthService } from '../login/auth.service';

@Component({
    selector: 'global-toolbar',
    templateUrl: './header.component.html'
})
export class HeaderComponent {

    currentUser : string = this.token.getCurrentUser();
    currentUserId : string = this.token.getCurrentUserId();

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private token: TokenStorage,
        private authService: AuthService) {
      }
      
      //TODO: Use guard and remove this method
      ngOnInit(): void {
        if(!this.authService.isAuthenticated()) {
          this.router.navigate(['login']);
        }
      }
      
      logout(): void {
        this.token.signOut();
        this.router.navigate(['login']);
      }

}