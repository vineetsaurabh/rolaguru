import { ErrorService } from './../error/error.service';
import { Component, Input } from "@angular/core";

import { Error } from "../error/error.model";
import { CauseRating } from "./cause-rating.model";
import { CauseService } from "./cause.service";

import { Location } from '@angular/common';
import { Cause } from './cause.model';

@Component({
  selector: 'list-causes',
  templateUrl: './list-cause.component.html'
})
export class ListCauseComponent {

    @Input() causes: Set<Cause>;

}
