import { Error } from '../error/error.model';

export class User {
  userid: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  active: boolean;
  email: string;
  checked: boolean;
  subscribedErrors: Set<Error>
}
