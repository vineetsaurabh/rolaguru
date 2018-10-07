import { Component } from "@angular/core";
import { MatTableDataSource, MatDialog } from "@angular/material";
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";

import { ListErrorComponent } from "./list-error.component";
import { ErrorService } from "./error.service";
import { TokenStorage } from "../login/token.storage";

@Component({
    selector: 'app-comp',
    templateUrl: './list-error.component.html'
})
export class FindErrorResultComponent extends ListErrorComponent {

    allColumns = ['Checkbox', 'Error Code', 'Description', 'Domain', 'Module', 'Operation', 'Severity', 'Frequency', 'Actions'];
    displayedColumns = this.allColumns;

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
        this.findErrors();
    };

    findErrors() {
        this.route.queryParams.subscribe(params => {
            this.errorService.findErrors(params.input)
                .subscribe(data => {
                    this.errors = data;
                    this.dataSource = new MatTableDataSource(data);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                });
        });
    }
}