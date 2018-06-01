import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TokenStorage } from './token.storage';
import { AuthService } from './auth.service';

@Component({
  selector: 'global-toolbar',
  templateUrl: './homepage.component.html'
})
export class HomepageComponent implements OnInit {

    title = 'Knowledge Base';
    tabs = ['List Users', 'Find User', 'List Errors', 'Find Error'];
    currentUser : string = this.token.getCurrentUser();

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
