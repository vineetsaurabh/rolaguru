import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

import { TokenStorage } from '../login/token.storage';
import { AuthService } from '../login/auth.service';
import { UserService } from '../user/user.service';

@Component({
    selector: 'global-toolbar',
    templateUrl: './header.component.html'
})
export class HeaderComponent {

    currentUser: string = this.token.getCurrentUser();
    currentUserId: string = this.token.getCurrentUserId();

    input: string = '';

    constructor(
        private router: Router,
        private token: TokenStorage,
        private authService: AuthService,
        private userService: UserService) {
    }

    findErrors() {
        let params: NavigationExtras = {
            queryParams: {
                input: this.input.trim(),
            }
        }
        this.router.navigate(['find'], params);
    }

    showProfilePicture() {
        const img: any = document.querySelector('img.user-picture');
        this.userService.downloadFile(this.currentUserId)
            .subscribe(res => {
                if (res.status == 200) {
                    const imageUrl = URL.createObjectURL(res.body);
                    img.addEventListener('load', () => URL.revokeObjectURL(imageUrl));
                    img.src = imageUrl;
                } else {
                    img.src = '../../assets/images/default-profile.jpg';
                }
            }, error => {
                img.src = '../../assets/images/default-profile.jpg';
            });
    }

    //TODO: Use guard and remove this method
    ngOnInit(): void {
        if (!this.authService.isAuthenticated()) {
            this.router.navigate(['login']);
        }
        this.showProfilePicture();
    }

    logout(): void {
        this.token.signOut();
        this.router.navigate(['login']);
    }

}