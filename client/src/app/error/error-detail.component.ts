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

  objectKeys = Object.keys;
  items = { };
  errid: number;
  errcode: string;
  causes: Set<Cause>;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private errorService: ErrorService,
    private toastService: ToastrService,
    private dialog: MatDialog ) {
  }

  ngOnInit() {
    this.route.paramMap
      .subscribe(params => {
        this.errid = +params.get('id');
      })
    
    this.errorService.getError(this.errid).subscribe((error) => {
        this.objectKeys = Object.keys;
        this.items = { 
          'Error Code' : error.errcode,
          'Message' : error.message, 
          'Error Type' : error.errortype,
          'Batch Type' : error.batchtype
        };
        this.errcode = error.errcode;
        this.causes = error.causes;
    })
  }

  public addCause(errid: string, errcode: string): Observable<boolean> {
    let dialogRef: MatDialogRef<AddCauseComponent>;
    dialogRef = this.dialog.open(AddCauseComponent, {
      data: [errid, errcode],
      width: '600px',
    });
    return dialogRef.afterClosed();
  }

}