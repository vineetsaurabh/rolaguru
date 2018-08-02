import { saveAs } from 'file-saver/FileSaver';
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

    id: number;
    public user: User = {
        userid : '',
        username : '',
        password : '',
        firstName : '',
        lastName : '',
        email : '',
        active : false,
        checked: false,
        picture: null,
      };

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
        })
    }

    /* File upload */
    selectedFiles: FileList;
    currentFileUpload: File;
    progress: { percentage: number } = { percentage: 0 };

    url: string;
    selectFile(event: any) {
        let target: any = event.target;
        this.selectedFiles = target.files;

        if (target.files && target.files[0]) {
            var reader = new FileReader();
            reader.readAsDataURL(target.files[0]);
            reader.onload = (event) => {
                this.url = target.result;
            }
        }

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
                }
            });
        this.selectedFiles = undefined;
    }

    showProfilePicture () {
        alert('Displaying profile picture of user id = ' + this.user.userid)
        this.userService.downloadFile(this.user.userid)
            .subscribe(res => {
                const blob = new Blob([res.body]);
                saveAs(blob, this.user.firstName);
            });
    }

    delete(file) {
        this.userService.deleteFile(file.profilePictureId)
            .subscribe(res => {
                this.toastService.success(`${file.filename} is deleted`);
                this.user = res;
            });
    }

}