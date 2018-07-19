import { User } from "../user/user.model";

export class CommentError {
    commentErrorId: string;
    errid: string;
    userid: string;
    comment: string;
    user: User;
    createdTimestamp: Date;
    modifiedTimestamp: Date;
}
