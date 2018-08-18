import { ListErrorComponent } from './list-error.component';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorService } from './error.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { TokenStorage } from '../login/token.storage';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';

@Component({
    selector: 'app-comp',
    templateUrl: './list-error.component.html'
})
export class SubscribedErrorsComponent extends ListErrorComponent {

    allColumns = ['Checkbox', 'Error Code', 'Description', 'Actions'];
    displayedColumns = this.allColumns;
    errorids: string[];
    errorDomainName = 'My Subscribed';

    constructor(
        protected router: Router,
        protected route: ActivatedRoute,
        protected errorService: ErrorService,
        protected toastService: ToastrService,
        protected dialog: MatDialog,
        protected token: TokenStorage) {
        super(router, route, errorService, toastService, dialog, token);
    }

    ngOnInit() {
        this.getSubscribedErrors();
        this.getSubscribedErrorIds();
    };

    getSubscribedErrors() {
        const userid = this.token.getCurrentUserId();
        this.errorService.getSubscribedErrors().subscribe(data => {
            this.errors = data;
            this.dataSource = new MatTableDataSource(data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
    }

    unSubscribeError(error) {
        this.errorService.unSubscribeError(error.errid)
            .subscribe(res => {
                this.token.removeSubscribedErrorIds("" + error.errid);
                this.getSubscribedErrorIds();
                this.toastService.success(`You have unsubscribed for Error ${error.errcode}`);
                this.getSubscribedErrors();
            });
    }

}