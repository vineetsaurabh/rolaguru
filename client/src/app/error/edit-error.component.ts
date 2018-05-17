import { Component, OnInit, Injectable, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Error } from './error.model';
import { HttpClient } from '@angular/common/http';
import { ErrorService } from './error.service';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'; 
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Cause } from './cause.model';

@Injectable()
@Component({
  templateUrl: './edit-error.component.html'
})
export class EditErrorComponent implements OnInit {

  public error: Error = {
    errid: '',
    errcode : '',
    message : '',
    errortype : '',
    batchtype : '',
    causes: new Set<Cause>()
  };
  errorForm: FormGroup; 

  constructor(
    private http: HttpClient,
    private router: Router, 
    private route: ActivatedRoute,
    private errorService: ErrorService,
    private fb: FormBuilder,
    private toastService: ToastrService,
    public dialogRef: MatDialogRef<EditErrorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Error ) {
      this.error = this.data;
  }

  ngOnInit() {
    this.errorForm = this.fb.group({  
        id: '',
        errCode: ['', [Validators.required]],  
        message: ['', [Validators.required]],  
        errorType: ['', [Validators.required]],  
        batchType: ['', [Validators.required]]
    })
  }

  updateError(errorForm: NgForm) {
    //Working -- 
    this.errorService.createError(this.error)
    // Not Working --this.userService.updateUser(this.user)
      .subscribe(res => {
          this.toastService.success(`Error ${this.error.errcode} updated`);
          this.dialogRef.close(false);
        } 
        , (error) => {
            console.log('EditErrorComponent.updateError --> ' + error);
        }
      );
  }

}