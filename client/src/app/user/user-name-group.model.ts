import { User } from './user.model';

export interface UserNameGroup {
    letter: string;
    assignees: User[];
}