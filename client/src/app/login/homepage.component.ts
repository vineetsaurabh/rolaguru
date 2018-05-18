import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'global-toolbar',
  templateUrl: './homepage.component.html'
})
export class HomepageComponent {

    title = 'Knolwedge Base';
    tabs = ['List Users', 'Find User', 'List Errors', 'Find Error'];
    loggedUsername : string = '';

    constructor() {}

}