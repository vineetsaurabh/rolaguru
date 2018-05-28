import { TokenStorage } from './../login/token.storage';
import { Component, Input, OnInit } from "@angular/core";
import { CommentErrorService } from './comment-error.service';
import { ToastrService } from 'ngx-toastr';
import { CommentError } from './comment-error.model';
import { Error } from './error.model';


@Component({
    selector: 'comment-error',
    templateUrl: './comment-error.component.html'
})
export class CommentErrorComponent implements OnInit {

    @Input() comment: CommentError;

    userid: string;

    htmlContent: '';
    edit: boolean = false;
    edithtmlContent: string;

    constructor(
        private commentErrorService: CommentErrorService,
        private toastService: ToastrService,
        private token: TokenStorage
    ) { }

    ngOnInit(): void {
        this.userid = this.token.getCurrentUserId();
        this.edithtmlContent = this.comment.comment;
    }

    updateCommentError(comment): void {
        this.commentErrorService.updateComment(comment)
            .subscribe(data => {
                this.comment = data;
                this.toastService.success(`Comment updated`);
            });
    };

    deleteCommentError(comment): void {
        this.commentErrorService.deleteComment(comment)
            .subscribe(data => {
                //Remove this component
                this.toastService.success(`Comment deleted`);
            });
    };

}
