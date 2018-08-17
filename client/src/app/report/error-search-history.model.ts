import { User } from "../user/user.model";

export class ErrorSearchHistory {
    errorSearchHistoryId: number;
    searchString: string;
    user: User;
    searchTimestamp: Date;
}