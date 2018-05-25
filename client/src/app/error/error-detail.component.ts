import { User } from './../user/user.model';
import { TokenStorage } from './../login/token.storage';
import { CauseService } from './../cause/cause.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Error } from './error.model';
import { HttpClient } from '@angular/common/http';
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
    errcode : '',
    message : '',
    errortype : '',
    batchtype : '',
    causes: new Set<Cause>()
  };
  errid: number;
  static userid: string;
  singleCause: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private errorService: ErrorService,
    private causeService: CauseService,
    private toastService: ToastrService,
    private token: TokenStorage,
    private dialog: MatDialog ) {
  }

  ngOnInit() {
    this.route.paramMap
      .subscribe(params => {
        this.errid = +params.get('id');
      });
    ErrorDetailComponent.userid = this.token.getCurrentUserId()
    this.getError();
    this.dialog.afterAllClosed.subscribe(() => {
      this.getError();
    });
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    }
  }

  private getError() {
    this.errorService.getError(this.errid).subscribe((error) => {
      this.error = error;

      if(Object.keys(error.causes).length == 1) {
        this.singleCause = true;
      }

      this.error.causes.forEach(function(cause) {
        let totalRating = 0;
        cause.myRating = 0;
        cause.myRatingTooltip = "Rate this solution";
        cause.ratings.forEach(function(rating) {
          totalRating = totalRating + rating.rating;
          if(rating.userid == +ErrorDetailComponent.userid) {
            cause.myRating = rating.rating;
            cause.myRatingTooltip = "My rating " + rating.rating;;
          }
        });
        cause.overallRating = 0;
        if(Object.keys(cause.ratings).length > 0) {
          cause.overallRating = Math.round( totalRating / Object.keys(cause.ratings).length * 100) / 100;
          cause.overallRatingTooltip = "Overall rating " + cause.overallRating;
        } else {
          cause.overallRatingTooltip = "No rating";
        }
      });

    })
  }

  findErrorByCode() {
    this.errorService.getErrorByCode(this.error.errcode)
      .subscribe( data => {
        this.error = data;
        this.router.navigate(['findError/'+this.error.errid]);
    });
  }

  rate(i: number, cause) {
    let causeRating = new CauseRating();
    causeRating.rating = i + 1;
    causeRating.causeid = cause.causeid;
    if(causeRating.causeRatingid == undefined) {
      this.causeService.createRating(causeRating)
        .subscribe(data => {
          this.error.causes
        });
    } else {
      this.causeService.updateRating(causeRating)
        .subscribe(data => {
          this.getError();
        });
    }
  }

}
