import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Error } from './error.model';
import { ErrorService } from './error.service';

@Component({
  templateUrl: './add-error.component.html'
})
export class AddErrorComponent {

  error: Error = new Error();

  constructor(private router: Router, private errorService: ErrorService) {

  }

  createError(): void {
    this.errorService.createError(this.error)
        .subscribe( data => {
          alert("Error added successfully.");
        });

  };

}