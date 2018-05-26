import { ErrorService } from './../error/error.service';
import { Component, Input, OnInit } from "@angular/core";

import { Error } from "../error/error.model";
import { CauseRating } from "./cause-rating.model";
import { CauseService } from "./cause.service";

import { Location } from '@angular/common';

@Component({
  selector: 'list-causes',
  templateUrl: './list-cause.component.html'
})
export class ListCauseComponent {

    @Input() error: Error;

}
