import { CauseRating } from "./cause-rating.model";

export class Cause {
  causeid: string;
  description: string;
  solution: string;
  ratings: Set<CauseRating>;
}
