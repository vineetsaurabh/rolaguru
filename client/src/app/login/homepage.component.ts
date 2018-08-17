import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ErrorDomain } from '../error/error-domain.model';

@Component({
    selector: 'dashboard',
    templateUrl: './homepage.component.html'
})
export class HomepageComponent {

    errorDomains: ErrorDomain[] = [
        {name: 'Flexcube', id: 'fx', color: 'lightsteelblue'},
        {name: 'Database', id: 'db', color: 'lavender'},
        {name: 'Acumen', id: 'am', color: 'lightsteelblue'},
        {name: 'Mobile App', id: 'ma', color: 'lavender'},
        {name: 'ERP', id: 'er', color: 'lightsteelblue'},
        {name: 'FCDB', id: 'fc', color: 'lavender'},
    ];

    constructor(private router: Router) { }

    navigate(domain) {
        let params: NavigationExtras = {
            queryParams: {
                domainId: domain.id,
                domainName: domain.name
            }
        }
        this.router.navigate(['listErrors'], params);
    }
}
