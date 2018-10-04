import { CauseRating } from "./cause-rating.model";
import { User } from "../user/user.model";
import { Observable } from "rxjs/Observable";

export class Cause {
    causeid: string;
    description: string;
    bankingScenerio: string;
    codeRootCause: string;
    dataRootCause: string;
    operationRootCause: string;
    ratings: Set<CauseRating>;
    createdTimestamp: Date;
    modifiedTimestamp: Date;
    user: User;
    files: Observable<string[]>;
}
