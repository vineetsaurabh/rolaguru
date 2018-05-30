import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CommentError } from './comment-error.model';
import { environment } from '../../environments/environment';


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CommentErrorService {

    constructor(private http: HttpClient) { }

    private commentUrl = environment.baseUrl + '/comment-error';

    public createComment(comment: CommentError) {
        return this.http.post<CommentError>(this.commentUrl, comment, httpOptions);
    }

    public getCommentsByErrid(errid: string) {
        let params = new HttpParams();
        params = params.append('errid', errid);
        return this.http.get<Set<CommentError>>(this.commentUrl + '/findbyerrid', { params: params });
    }

    public updateComment(comment: CommentError) {
        return this.http.put<CommentError>(this.commentUrl + "/" + comment.id, comment, httpOptions);
    }

    public deleteComment(comment: CommentError) {
        return this.http.delete(this.commentUrl + "/" + comment.id);
    }

}
