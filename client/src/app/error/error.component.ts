import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Error } from './error.model';
import { ErrorService } from './error.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styles: []
})
export class ErrorComponent implements OnInit {

  errors: Error[];

  constructor(private router: Router, private errorService: ErrorService) {

  }

  ngOnInit() {
    this.errorService.getErrors()
      .subscribe( data => {
        this.errors = data;
      });
  };

  deleteError(error: Error): void {
    this.errorService.deleteError(error)
      .subscribe( data => {
        this.errors = this.errors.filter(u => u !== error);
      })
  };

}
