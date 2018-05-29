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
    htmlContent: string = '';
    edithtmlContent: string = '';
    editing: boolean = false;
    deleted: boolean = false;

    constructor(
        private commentErrorService: CommentErrorService,
        private toastService: ToastrService,
        private token: TokenStorage
    ) { }

    ngOnInit(): void {
        this.userid = this.token.getCurrentUserId();
    }

    openInEdit() {
        this.editing = true; 
        this.edithtmlContent = this.comment.comment;
    }

    updateCommentError(): void {
        if(this.comment.comment != this.edithtmlContent) {
            this.comment.comment = this.edithtmlContent;
            this.commentErrorService.updateComment(this.comment)
                .subscribe(data => {
                    this.comment = data;
                    this.toastService.success(`Comment updated`);
                    this.editing = false;
                });
        } else {
            this.editing = false;
        }
    };

    deleteCommentError(comment): void {
        this.commentErrorService.deleteComment(comment)
            .subscribe(data => {
                this.deleted = true;
                this.toastService.success(`Comment deleted`);
            });
    };

}
