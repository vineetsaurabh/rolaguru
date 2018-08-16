import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ErrorDomain } from '../error/error-domain.model';

@Component({
    selector: 'dashboard',
    templateUrl: './homepage.component.html'
})
export class HomepageComponent {

    errorCategories: ErrorDomain[] = [
        {name: 'Flexcube', id: 'fx', color: 'lightsteelblue'},
        {name: 'Database', id: 'db', color: 'lavender'},
        {name: 'Acumen', id: 'am', color: 'lightsteelblue'},
        {name: 'Mobile App', id: 'ma', color: 'lavender'},
        {name: 'ERP', id: 'er', color: 'lightsteelblue'},
        {name: 'FCDB', id: 'fc', color: 'lavender'},
    ];

    constructor(private router: Router) { }

    navigate(category) {
        let params: NavigationExtras = {
            queryParams: {
                cat: category.id,
                name: category.name
            }
        }
        this.router.navigate(['listErrors'], params);
    }
}
