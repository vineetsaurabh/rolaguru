import { Cause } from "../cause/cause.model";
import { Observable } from "rxjs/Observable";
import { User } from "../user/user.model";

export class Error {
    errid: string;
    domain: string;
    module: string;
    errcode: string;
    description: string;
    operation: string;
    severity: number = 1;
    priority: string;
    frequency: number;
    causes: Set<Cause>;
    checked: boolean;
    files: Observable<string[]>;
    createdTimestamp: Date;
    modifiedTimeStamp: Date;
    user: User;
}
