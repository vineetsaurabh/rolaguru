import { Role } from '../role/role.model';
import { Team } from '../Team/Team.model';

export class User {
  userid: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  email: string;
  phone: string;
  expertise: string;
  address: string;
  active: boolean;
  checked: boolean;
  roles: Role[];
  teams: Team[];
}
