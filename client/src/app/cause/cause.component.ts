import { Router } from '@angular/router';
import { Component, Input, OnInit, EventEmitter, Output } from "@angular/core";
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';
import { CauseRating } from "./cause-rating.model";
import { CauseService } from "./cause.service";
import { Cause } from "./cause.model";
import { TokenStorage } from "../login/token.storage";
import { ToastrService } from 'ngx-toastr';
import { saveAs } from 'file-saver/FileSaver';
import { RolaguruUtils } from '../util/rolaguru.util'

@Component({
    selector: 'cause-solution',
    templateUrl: './cause.component.html'
})
export class CauseComponent implements OnInit {

    @Input() cause: Cause;
    @Input() j: number;
    @Input() causes: Set<Cause>;
    @Output() causesChange = new EventEmitter<Set<Cause>>();

    userid: string;
    editing: boolean = false;
    editDescription: string = '';
    editBankingScenerio: string = '';
    editCodeRootCause: string = '';
    editDataRootCause: string = '';
    editOperationRootCause: string = '';

    myRating: CauseRating = new CauseRating();
    myRatingTooltip: string = "Rate this solution";
    overallRating: number = 0;
    overallRatingTooltip: string = "No rating";
    overallRatingStar: string = "00000";
    totalRating: number = 0;
    noOfRatings: number = 0;

    rolaguruUtils = RolaguruUtils.getInstance();

    constructor(
        private token: TokenStorage,
        private causeService: CauseService,
        private toastService: ToastrService,
        private route: Router) {
    }

    ngOnInit(): void {
        this.userid = this.token.getCurrentUserId();
        this.noOfRatings = Object.keys(this.cause.ratings).length;
        this.calculateRating();
        this.calculateOverallRating();
        this.editBankingScenerio = this.cause.bankingScenerio;
        this.editDescription = this.cause.description;
        this.editCodeRootCause = this.cause.codeRootCause;
        this.editDataRootCause = this.cause.dataRootCause;
        this.editOperationRootCause = this.cause.operationRootCause;
    }

    ngAfterViewInit() {
        // this.cause.files.forEach(file => this.showFile(file));
    }

    calculateRating(): void {
        for (let rating of Array.from(this.cause.ratings.values())) {
            this.totalRating = this.totalRating + rating.rating;
            if (rating.userid == +this.userid) {
                this.myRating = rating;
                this.myRatingTooltip = "My rating " + rating.rating;
            }
        }
    }

    calculateOverallRating(): void {
        if (this.noOfRatings > 0) {
            this.overallRating = Math.round(this.totalRating / this.noOfRatings * 10) / 10;
            this.overallRatingTooltip = "Overall rating " + this.overallRating;
            if (this.overallRating % 1 == 0) {
                this.overallRatingStar = '2'.repeat(this.overallRating) + '0'.repeat(5 - this.overallRating);
            } else {
                this.overallRatingStar = '2'.repeat(Math.floor(this.overallRating)) + '1' + '0'.repeat(4 - (Math.floor(this.overallRating)));
            }
        }
    }

    rate(i: number, myRating, cause) {
        myRating.rating = i + 1;
        if (this.myRating.causeid == undefined) {
            myRating.causeid = cause.causeid;
            this.causeService.createRating(myRating)
                .subscribe(data => {
                    this.myRatingTooltip = "My rating " + myRating.rating;
                    this.totalRating += myRating.rating;
                    this.noOfRatings++;
                    this.calculateOverallRating();
                    this.toastService.success(`Rated ${myRating.rating}`);
                });
        } else {
            this.causeService.updateRating(myRating)
                .subscribe(data => {
                    this.totalRating = myRating.rating;
                    for (let rating of Array.from(this.cause.ratings.values())) {
                        if (rating.userid != myRating.userid) {
                            this.totalRating = this.totalRating + rating.rating;
                        }
                    }
                    this.myRatingTooltip = "My rating " + myRating.rating;
                    this.calculateOverallRating();
                    this.toastService.warning(`Rating changed to ${myRating.rating}`);
                });
        }
    }

    openInEdit() {
        this.editing = true;
    }

    saveCause() {
        this.editing = false;
        if (this.cause.description != this.editDescription || 
                this.cause.bankingScenerio != this.editBankingScenerio || 
                this.cause.codeRootCause != this.editCodeRootCause ||
                this.cause.dataRootCause != this.editDataRootCause || 
                this.cause.operationRootCause != this.editOperationRootCause) {
            let causeToUpdate = this.cause;
            causeToUpdate.description = this.editDescription;
            causeToUpdate.bankingScenerio = this.editBankingScenerio;
            causeToUpdate.codeRootCause = this.editCodeRootCause;
            causeToUpdate.dataRootCause = this.editDataRootCause;
            causeToUpdate.operationRootCause = this.editOperationRootCause;
            this.causeService.updateCause(causeToUpdate)
                .subscribe(data => {
                    this.cause = data;
                    this.toastService.success(`Solution updated`);
                })
        }
    }

    deleteCause() {
        this.causeService.deleteCause(this.cause)
            .subscribe(data => {
                let newCauses: Set<Cause> = new Set<Cause>();
                this.causes.forEach(cause => {
                    if (cause.causeid != this.cause.causeid) {
                        newCauses.add(cause);
                    }
                })
                this.causes = newCauses;
                this.causesChange.emit(this.causes);
                this.toastService.success(`Solution deleted`);

                this.causeService.emitCauseDeleted(1);
            })
    }


    /* File upload */
    selectedFiles: FileList;
    currentFileUpload: File;
    progress: { percentage: number } = { percentage: 0 };

    selectScriptFileForCause(event) {
        this.selectedFiles = event.target.files;
        this.uploadFileForCause('Script');
        event = null;
        return false;
    }

    selectSolnDocFileForCause(event) {
        this.selectedFiles = event.target.files;
        this.uploadFileForCause('SolnDoc');
        event = null;
        return false;
    }

    selectKnowDocFileForCause(event) {
        this.selectedFiles = event.target.files;
        this.uploadFileForCause('KnowDoc');
        event = null;
        return false;
    }

    selectVideoFileForCause(event) {
        this.selectedFiles = event.target.files;
        this.uploadFileForCause('Video');
        event = null;
        return false;
    }
    
    uploadFileForCause(category: string) {
        this.progress.percentage = 0;
        this.currentFileUpload = this.selectedFiles.item(0);
        this.causeService.uploadFile(this.currentFileUpload, this.cause.causeid, category)
            .subscribe(event => {
                if (event.type === HttpEventType.UploadProgress) {
                    this.progress.percentage = Math.round(100 * event.loaded / event.total);
                } else if (event instanceof HttpResponse) {
                    this.toastService.success(`${this.currentFileUpload.name} is uploaded`);
                    this.cause = event.body;
                    this.currentFileUpload = undefined;
                }
            });
        this.selectedFiles = undefined;
    }

    download(file) {
        this.causeService.downloadFile(file.causeDocId)
            .subscribe(res => {
                saveAs(res.body, file.filename);
            });
    }

    showFile(file) {
        const fileToShow: any = document.getElementById(`file-${file.causeDocId}`);
        this.causeService.downloadFile(file.causeDocId)
            .subscribe(res => {
                const url = URL.createObjectURL(res.body);
                fileToShow.addEventListener('load', () => URL.revokeObjectURL(url));
                fileToShow.src = url;
            });

    }

    delete(file) {
        this.causeService.deleteFile(file.causeDocId)
            .subscribe(res => {
                this.toastService.success(`${file.filename} is deleted`);
                this.cause = res;
            });
    }

}
