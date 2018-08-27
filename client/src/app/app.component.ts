import { Component } from '@angular/core';
import { TokenStorage } from './login/token.storage';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {

  showGlobalToolbar: boolean = false;

  constructor(private router: Router) {
    router.events.forEach((event) => {
      if(event instanceof NavigationStart) {
          this.showGlobalToolbar = event.url !== "/login";
      }
    });
  }

}
