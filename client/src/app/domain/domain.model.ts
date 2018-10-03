import { User } from '../user/user.model';
import { Module } from '../module/module.model';

export class Domain {
    domainId: string;
    domainName: string;
    description: string;
    modules: Set<Module>;
    domainOwner: User;
    defaultDomain: boolean;
    checked: boolean;
}