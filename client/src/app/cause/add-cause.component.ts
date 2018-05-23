import { CauseService } from './cause.service';
import { Component, OnInit, Injectable, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'; 
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Cause } from './cause.model';
import { Error } from '../error/error.model';

@Injectable()
@Component({
  templateUrl: './add-cause.component.html'
})
export class AddCauseComponent {

  errid : string;
  errcode: string;
  cause: Cause = new Cause();
  stars = [true, true, true, true, true];

  constructor(
    private toastService: ToastrService,
    private causeService: CauseService,
    public dialogRef: MatDialogRef<AddCauseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string[] ) {
      this.errid = this.data[0];
      this.errcode = this.data[1];
  }

  createCause(): void {
    this.causeService.createCause(this.cause, this.errid)
    .subscribe( data => {
      this.toastService.success(`Solution for ${this.errcode} added`);
      this.dialogRef.close(false);
    });
  };

  setRating(data: any) {
    this.cause.rating = data + 1;
    for(var i=0; i<5; i++) {
      if(i <= data) {
        this.stars[i] = false;
      } else {
        this.stars[i] = true;
      }  
    } 
  } 

}
