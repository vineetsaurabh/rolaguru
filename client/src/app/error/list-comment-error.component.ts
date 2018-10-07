import { Input, Component } from "@angular/core";
import { ToastrService } from 'ngx-toastr';

import { CommentError } from './comment-error.model';
import { CommentErrorService } from './comment-error.service';
import { TokenStorage } from '../login/token.storage';

@Component({
    selector: 'list-comment-error',
    templateUrl: './list-comment-error.component.html'
})
export class ListErrorCommentComponent {

    @Input() errid: string;

    comments: Set<CommentError>;
    htmlContent: string = '';
    userid: string;

    constructor(
        private toastService: ToastrService,
        private commentErrorService: CommentErrorService,
        private token: TokenStorage) {
    }

    ngOnInit() {
        this.userid = this.token.getCurrentUserId();
        this.getCommentsByErrid();
    }

    getCommentsByErrid() {
        this.commentErrorService.getCommentsByErrid(this.errid)
            .subscribe(data => {
                this.comments = data;
            });
    }

    createCommentError(): void {
        let commentError = new CommentError();
        commentError.comment = this.htmlContent;
        commentError.errid = this.errid;
        commentError.userid = this.userid;
        this.commentErrorService.createComment(commentError)
            .subscribe(data => {
                this.htmlContent = '';
                this.getCommentsByErrid();
                this.toastService.success(`Comment added`);
            });
    };

}
