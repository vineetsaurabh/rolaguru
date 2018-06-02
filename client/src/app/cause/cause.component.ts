import { Router } from '@angular/router';
import { Component, Input, OnInit, EventEmitter, Output } from "@angular/core";
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';
import { CauseRating } from "./cause-rating.model";
import { CauseService } from "./cause.service";
import { Cause } from "./cause.model";
import { TokenStorage } from "../login/token.storage";
import { ToastrService } from 'ngx-toastr';

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
    editSolution: string = '';
    editDescription: string = '';
    editing: boolean = false;

    myRating: CauseRating = new CauseRating();
    myRatingTooltip: string = "Rate this solution";
    overallRating: number = 0;
    overallRatingTooltip: string = "No rating";
    overallRatingStar: string = "00000";
    totalRating: number = 0;
    noOfRatings: number = 0;

    constructor(
        private token: TokenStorage,
        private causeService: CauseService,
        private toastService: ToastrService,
        private route: Router ) {
    }

    ngOnInit(): void {
        this.userid = this.token.getCurrentUserId();
        this.noOfRatings = Object.keys(this.cause.ratings).length;
        this.calculateRating();
        this.calculateOverallRating();
        this.editSolution = this.cause.solution;
        this.editDescription = this.cause.description;
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
        if (this.cause.solution != this.editSolution || this.cause.description != this.editDescription) {
            let causeToUpdate = this.cause;
            causeToUpdate.solution = this.editSolution;
            causeToUpdate.description = this.editDescription;
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
                let newCause: Set<Cause> = new Set<Cause>();
                this.causes.forEach(cause => {
                    if (cause.causeid != this.cause.causeid) {
                        newCause.add(cause);
                    }
                })
                this.causes = newCause;
                this.causesChange.emit(this.causes);

                this.toastService.success(`Solution deleted`);
            })
    }


    /* File upload */
    selectedFiles: FileList;
    currentFileUpload: File;
    progress: { percentage: number } = { percentage: 0 };

    upload() {
        console.log('File upload started');
        this.progress.percentage = 0;
        this.currentFileUpload = this.selectedFiles.item(0);
        this.causeService.uploadFile(this.currentFileUpload, this.cause.causeid).subscribe(event => {
            if (event.type === HttpEventType.UploadProgress) {
                this.progress.percentage = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
                console.log('File is completely uploaded!');
            }
        });
        this.selectedFiles = undefined;
    }

    selectFile(event) {
        this.selectedFiles = event.target.files;
    }

}
