import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Error } from './error.model';
import { ErrorService } from './error.service';

@Component({
  templateUrl: './add-error.component.html'
})
export class AddErrorComponent {

  error: Error = new Error();

  constructor(private router: Router, private errorService: ErrorService) {

  }

  createError(errorForm: NgForm): void {
    this.errorService.createError(this.error)
        .subscribe( data => {
          errorForm.reset();
          alert("Error added successfully.");
        });

  };

}
