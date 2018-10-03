import { User } from '../user/user.model';
import { Domain } from '../domain/domain.model';

export class Module {
    moduleId: string;
    moduleName: string;
    description: string;
    moduleOwner: User;
    domain: Domain;
    checked: boolean;
}