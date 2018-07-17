import { Component } from '@angular/core';

export interface ErrorCategory {
    name: string;
    color: string;
}

@Component({
    selector: 'dashboard',
    templateUrl: './homepage.component.html'
})
export class HomepageComponent {
    errorCategories: ErrorCategory[] = [
        {name: 'Flexcube', color: 'lightsteelblue'},
        {name: 'Database', color: 'lavender'},
        {name: 'Acumen', color: 'lightsteelblue'},
        {name: 'Mobile App', color: 'lavender'},
        {name: 'ERP', color: 'lightsteelblue'},
        {name: 'FCDB', color: 'lavender'},
    ];
}
