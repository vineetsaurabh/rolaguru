import { Router } from '@angular/router';
import { Component, Input, OnInit } from "@angular/core";
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
        this.noOfRatings = Object.keys(this.cause.ratings).length;
        this.calculateRating();
        this.calculateOverallRating();
    }
    
    calculateRating(): void {
        for(let rating of Array.from(this.cause.ratings.values())) {
            this.totalRating = this.totalRating + rating.rating;
            if(rating.userid == +this.token.getCurrentUserId()) {
                this.myRating = rating;
                this.myRatingTooltip = "My rating " + rating.rating;
            }
        } 
    }
    
    calculateOverallRating(): void {
        if(this.noOfRatings > 0) {
            this.overallRating = Math.round(this.totalRating / this.noOfRatings * 10) / 10;
            this.overallRatingTooltip = "Overall rating " + this.overallRating;
            if(this.overallRating % 1 == 0) {
                this.overallRatingStar = '2'.repeat(this.overallRating) + '0'.repeat(5-this.overallRating);
            } else {
                this.overallRatingStar = '2'.repeat(Math.floor(this.overallRating)) + '1' + '0'.repeat(4 - (Math.floor(this.overallRating)));
            }
        }
    }

    rate(i: number, myRating, cause) {
        myRating.rating = i + 1;
        if(this.myRating.causeid == undefined) {
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
                    for(let rating of Array.from(this.cause.ratings.values())) {
                        if(rating.userid != myRating.userid) {
                            this.totalRating = this.totalRating + rating.rating;
                        }
                    }
                    this.myRatingTooltip = "My rating " + myRating.rating;
                    this.calculateOverallRating();
                    this.toastService.warning(`Rating changed to ${myRating.rating}`);
                });
        }
    }

}
