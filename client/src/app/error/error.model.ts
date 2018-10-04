import { Cause } from "../cause/cause.model";
import { Observable } from "rxjs/Observable";
import { User } from "../user/user.model";
import { Module } from "../module/module.model";
import { Domain } from "../domain/domain.model";

export class Error {
    errid: string;
    domain: Domain;
    module: Module;
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
    modifiedTimestamp: Date;
    user: User;
}
