import { User } from '../user/user.model';

export class Role {
    roleid: string;
    name: string;
    description: string;
    users: Set<User>;
    checked: boolean;
}