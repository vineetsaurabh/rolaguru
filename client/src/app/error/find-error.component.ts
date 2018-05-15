import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ErrorService } from './error.service';
import { Error } from './error.model';
import { Router } from '@angular/router';

@Component({
  selector: 'error-detail',
  templateUrl: './find-error.component.html',
  styles: []
})
export class FindErrorComponent {

  public error: Error = {
    id: '',
    errCode : '',
    message : '',
    errorType : '',
    batchType : ''
  };
  
  constructor(
    private router: Router,
    private errorService: ErrorService) {}
 
  findErrorByCode() {
    this.errorService.getErrorByCode(this.error.errCode)
      .subscribe( data => {
        this.error = data;
        this.router.navigate(['findError/'+this.error.id]);
    });
  }

}
