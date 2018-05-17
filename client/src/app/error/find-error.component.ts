import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ErrorService } from './error.service';
import { Error } from './error.model';
import { Router } from '@angular/router';
import { Cause } from '../cause/cause.model';

@Component({
  selector: 'error-detail',
  templateUrl: './find-error.component.html',
  styles: []
})
export class FindErrorComponent implements OnInit {

  
  public error: Error = {
    errid: '',
    errcode : '',
    message : '',
    errortype : '',
    batchtype : '',
    causes: new Set<Cause>()
  };
  
  constructor(
    private router: Router,
    private errorService: ErrorService) {}

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    }
  }

  findErrorByCode() {
    this.errorService.getErrorByCode(this.error.errcode)
      .subscribe( data => {
        this.error = data;
        this.router.navigate(['findError/'+this.error.errid]);
    });
  }

}
