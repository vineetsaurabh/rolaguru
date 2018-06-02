import { CauseRating } from "./cause-rating.model";
import { User } from "../user/user.model";
import { Observable } from "rxjs/Observable";

export class Cause {
  causeid: string;
  description: string;
  solution: string;
  ratings: Set<CauseRating>;
  user: User;
  files: Observable<string[]>;
}
