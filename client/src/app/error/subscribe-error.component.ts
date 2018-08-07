import { ListErrorComponent } from './list-error.component';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorService } from './error.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { TokenStorage } from '../login/token.storage';

@Component({
    selector: 'app-comp',
    templateUrl: './subscribe-error.component.html'
})
export class SubscribedErrorsComponent extends ListErrorComponent {

    allColumns = ['Error Code'];
    displayedColumns = this.allColumns;
    errorids: string[];

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
        this.getErrors();
    };

    getErrors() {
        this.errorService.getSubscribeErrors()
            .subscribe(data => {
                this.errorids = data;
                this.dataSource = new MatTableDataSource(data);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            });
    }

}