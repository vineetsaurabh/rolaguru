import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

import { TokenStorage } from './../login/token.storage';
import { User } from './user.model';
import { UserService } from './user.service';


@Component({
    templateUrl: './user-detail.component.html'
})
export class UserDetailComponent {

    id: number;
    public user: User = {
        userid: '',
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        dateOfBirth: null,
        email: '',
        phone: '',
        address: '',
        expertise: '',
        active: false,
        checked: false,
        roles: [],
        teams: [],
    };
    loggedUserId: string;
    password: string;

    constructor(
        private http: HttpClient,
        private route: ActivatedRoute,
        private toastService: ToastrService,
        private userService: UserService,
        private token: TokenStorage) {
    }

    ngOnInit() {
        this.route.paramMap
            .subscribe(params => {
                this.id = +params.get('id');
            });

        /*
        if (this.route.snapshot.params["id"]) {  
            this.id = this.route.snapshot.params["id"];  
        } */

        this.userService.getUser(this.id).subscribe((user) => {
            this.user = user;
            this.showProfilePicture();
        });
        this.loggedUserId = this.token.getCurrentUserId();
    }

    /* File upload */
    selectedFiles: FileList;
    currentFileUpload: File;
    progress: { percentage: number } = { percentage: 0 };

    selectFile(event: any) {
        let target: any = event.target;
        this.selectedFiles = target.files;
        this.upload();
        event = null;
        return false;
    }

    upload() {
        this.progress.percentage = 0;
        this.currentFileUpload = this.selectedFiles.item(0);
        this.userService.uploadFile(this.currentFileUpload)
            .subscribe(event => {
                if (event.type === HttpEventType.UploadProgress) {
                    this.progress.percentage = Math.round(100 * event.loaded / event.total);
                } else if (event instanceof HttpResponse) {
                    this.toastService.success(`${this.currentFileUpload.name} is uploaded`);
                    this.user = event.body;
                    this.currentFileUpload = undefined;
                    this.showProfilePicture();
                }
            });
        this.selectedFiles = undefined;
    }

    showProfilePicture() {
        const img: any = document.querySelector('img.profile-picture');
        this.userService.downloadFile(this.user.userid)
            .subscribe(res => {
                if(res.status == 200) {
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

    delete(file) {
        this.userService.deleteFile(file.profilePictureId)
            .subscribe(res => {
                this.toastService.success(`${file.filename} is deleted`);
                this.user = res;
            });
    }

    changePassword() {
        const enterPasswordDiv = document.getElementById('enter-password');
        enterPasswordDiv.style.display = "block";
    }

    cancel() {
        this.password = '';
        const enterPasswordDiv = document.getElementById('enter-password');
        enterPasswordDiv.style.display = "none";
    }

    savePassword() {
        if(this.password) {
            this.user.password = this.password.trim();
            this.userService.savePassword(this.user)
                .subscribe(res => {
                    this.toastService.success(`Password is successfully changed.`);
                    const enterPasswordDiv = document.getElementById('enter-password');
                    enterPasswordDiv.style.display = "none";
                });
        } else {
            this.toastService.warning(`Please enter a password.`);
        }
    }

}