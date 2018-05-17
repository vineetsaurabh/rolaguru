import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Error } from './error.model';
import { ErrorService } from './error.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  templateUrl: './add-error.component.html'
})
export class AddErrorComponent {

  error: Error = new Error();

  constructor(
    private router: Router,
    private errorService: ErrorService, 
    private toastService: ToastrService) {

  }

  createError(errorForm: NgForm): void {
    this.errorService.createError(this.error)
        .subscribe( data => {
          this.toastService.success(`Error ${this.error.errcode} added`);
          errorForm.reset();
          this.router.navigate(['listErrors']);
        });
  };

}
