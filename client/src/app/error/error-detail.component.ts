import { RolaguruUtils } from './../util/rolaguru.util';
import { saveAs } from 'file-saver/FileSaver';
import { User } from './../user/user.model';
import { TokenStorage } from './../login/token.storage';
import { CauseService } from './../cause/cause.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Error } from './error.model';
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';
import { ErrorService } from './error.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { AddCauseComponent } from '../cause/add-cause.component';
import { Cause } from '../cause/cause.model';
import { CauseRating } from '../cause/cause-rating.model';


@Component({
    templateUrl: './error-detail.component.html'
})
export class ErrorDetailComponent implements OnInit {

    public error: Error = {
        errid: '',
        domain: '',
        module: '',
        errcode: '',
        description: '',
        operation: '',
        severity: '',
        frequency: '',
        causes: new Set<Cause>(),
        checked: false,
        files: null
    };
    errid: number;
    rolaguruUtils = RolaguruUtils.getInstance();

    constructor(
        private http: HttpClient,
        private router: Router,
        private route: ActivatedRoute,
        private errorService: ErrorService,
        private causeService: CauseService,
        private toastService: ToastrService,
        private token: TokenStorage,
        private dialog: MatDialog) {
    }

    ngOnInit() {
        this.route.paramMap
            .subscribe(params => {
                this.errid = +params.get('id');
            });

        this.getError();
        this.dialog.afterAllClosed.subscribe(() => {
            this.getError();
        });
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
        }
    }

    private getError() {
        this.errorService.getError(this.errid).subscribe((error) => {
            this.error = error;
        })
    }

    findErrorByCode() {
        this.errorService.getErrorByCode(this.error.errcode)
            .subscribe(data => {
                this.error = data;
                this.router.navigate(['findError/' + this.error.errid]);
            });
    }

    /* File upload */
    selectedFiles: FileList;
    currentFileUpload: File;
    progress: { percentage: number } = { percentage: 0 };

    selectFileForError(event) {
        this.selectedFiles = event.target.files;
        this.uploadFileForError();
        event = null;
        return false;
    }
    
    uploadFileForError() {
        this.progress.percentage = 0;
        this.currentFileUpload = this.selectedFiles.item(0);
        this.errorService.uploadFile(this.currentFileUpload, this.error.errid)
            .subscribe(event => {
                if (event.type === HttpEventType.UploadProgress) {
                    this.progress.percentage = Math.round(100 * event.loaded / event.total);
                } else if (event instanceof HttpResponse) {
                    this.toastService.success(`${this.currentFileUpload.name} is uploaded`);
                    this.error = event.body;
                    this.currentFileUpload = undefined;
                }
            });
        this.selectedFiles = undefined;
    }

    download(file) {
        this.errorService.downloadFile(file.errorDocId)
            .subscribe(res => {
                saveAs(res.body, file.filename);
            });
    }

    showFile(file) {
        const fileToShow: any = document.getElementById(`file-${file.errorDocId}`);
        this.errorService.downloadFile(file.errorDocId)
            .subscribe(res => {
                const url = URL.createObjectURL(res.body);
                fileToShow.addEventListener('load', () => URL.revokeObjectURL(url));
                fileToShow.src = url;
            });

    }

    delete(file) {
        this.errorService.deleteFile(file.errorDocId)
            .subscribe(res => {
                this.toastService.success(`${file.filename} is deleted`);
                this.error = res;
            });
    }

}
