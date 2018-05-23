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

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private errorService: ErrorService,
    private causeService: CauseService,
    private toastService: ToastrService,
    private dialog: MatDialog ) {
  }

  ngOnInit() {
    this.route.paramMap
      .subscribe(params => {
        this.errid = +params.get('id');
      })
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
    })
  }

  findErrorByCode() {
    this.errorService.getErrorByCode(this.error.errcode)
      .subscribe( data => {
        this.error = data;
        this.router.navigate(['findError/'+this.error.errid]);
    });
  }


  updateRating(data: any, cause) {
    cause.rating = data + 1;                           
    this.causeService.updateCause(cause)
      .subscribe(data => {
        console.log(`Rating changed`);
      })
  }

}
