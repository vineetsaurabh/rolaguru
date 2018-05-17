import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Error } from './error.model';
import { HttpClient } from '@angular/common/http';
import { ErrorService } from './error.service';


@Component({
  templateUrl: './error-detail.component.html'
})
export class ErrorDetailComponent implements OnInit {

  objectKeys = Object.keys;
  items = { };
  id: number;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private errorService: ErrorService ) {
  }

  ngOnInit() {
    this.route.paramMap
      .subscribe(params => {
        this.id = +params.get('id');
      })
    
    this.errorService.getError(this.id).subscribe((error) => {
        this.objectKeys = Object.keys;
        this.items = { 
          'Error Code' : error.errcode,
          'Message' : error.message, 
          'Error Type' : error.errortype,
          'Batch Type' : error.batchtype
        };
    })
  }

}