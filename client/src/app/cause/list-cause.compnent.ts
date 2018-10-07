import { Component, Input } from "@angular/core";
import { Cause } from './cause.model';

@Component({
  selector: 'list-causes',
  templateUrl: './list-cause.component.html'
})
export class ListCauseComponent {

  @Input() causes: Set<Cause>;

}
