import { User } from '../user/user.model';

export class Team {
    teamid: string;
    teamName: string;
    description: string;
    users: Set<User>;
    checked: boolean;
}