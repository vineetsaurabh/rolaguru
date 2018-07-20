import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from './user.model';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { UserService } from './user.service';
import { ToastrService } from 'ngx-toastr';


@Component({
    templateUrl: './user-detail.component.html'
})
export class UserDetailComponent implements OnInit {

    objectKeys = Object.keys;
    items = {};
    id: number;
    user: User;

    constructor(
        private http: HttpClient,
        private route: ActivatedRoute,
        private toastService: ToastrService,
        private userService: UserService) {
    }

    ngOnInit() {
        this.route.paramMap
            .subscribe(params => {
                this.id = +params.get('id');
            })

        /*
        if (this.route.snapshot.params["id"]) {  
            this.id = this.route.snapshot.params["id"];  
        } */

        this.userService.getUser(this.id).subscribe((user) => {
            this.user = user;
            this.objectKeys = Object.keys;
            this.items = {
                'Username': user.username,
                'First Name': user.firstName,
                'Last Name': user.lastName,
                'Active': user.active,
                'Email ID': user.email
            };
        })
    }

    /* File upload */
    selectedFiles: FileList;
    currentFileUpload: File;
    progress: { percentage: number } = { percentage: 0 };

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
                }
            });
        this.selectedFiles = undefined;
    }

    selectFile(event) {
        this.selectedFiles = event.target.files;
        this.upload();
        event = null;
        return false;
    }

    delete(file) {
        this.userService.deleteFile(file.profilePictureId)
            .subscribe(res => {
                this.toastService.success(`${file.filename} is deleted`);
                this.user = res;
            });
    }

}