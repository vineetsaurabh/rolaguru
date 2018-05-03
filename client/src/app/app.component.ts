import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'Knolwedge Base';
  tabs = ['List Users', 'Add User', 'Find User', 'List Errors', 'Add Error'];
  tabId:string = 'users';
}
