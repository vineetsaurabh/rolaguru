import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from './user.service';
import { User } from './user.model';

@Component({
    selector: 'user-detail',
    templateUrl: './find-user.component.html',
    styles: []
})
export class FindUserComponent {

    public user: User = {
        userid: '',
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        dateOfBirth: null,
        email: '',
        phone: '',
        expertise: '',
        address: '',
        active: false,
        checked: false,
        roles: [],
    };

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private userService: UserService) {
    }

    ngOnInit(): void {
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
        }
    }

    findUserByEmail() {
        this.userService.getUserByEmail(this.user.email)
            .subscribe(data => {
                this.user = data;
                this.router.navigate(['findUser/' + this.user.userid]);
            });
    }

}
