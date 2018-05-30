import { CauseRating } from "./cause-rating.model";
import { User } from "../user/user.model";

export class Cause {
  causeid: string;
  description: string;
  solution: string;
  ratings: Set<CauseRating>;
  user: User;
}
