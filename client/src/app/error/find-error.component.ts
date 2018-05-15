import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ErrorService } from './error.service';
import { Error } from './error.model';

@Component({
  selector: 'error-detail',
  templateUrl: './find-error.component.html',
  styles: []
})
export class FindErrorComponent {

  public error: Error = {
    errCode : '',
    message : '',
    errorType : '',
    batchType : ''
  };

  constructor(
    private http: HttpClient,
    private errorService: ErrorService) {
  }

}
