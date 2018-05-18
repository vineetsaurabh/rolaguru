
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { Error } from './error.model';
import { ErrorService } from './error.service';
import { EditErrorComponent } from './edit-error.component';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource, MatPaginator, MatSort, MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { ErrorDetailComponent } from './error-detail.component';
import { AddCauseComponent } from '../cause/add-cause.component';
import { AddErrorComponent } from './add-error.component';

@Component({
  selector: 'app-user',
  templateUrl: './list-error.component.html',
  styles: []
})
export class ListErrorComponent implements OnInit {

  errors: Error[];
  displayedColumns = ['errcode', 'message', 'errortype', 'batchtype', 'actions'];
  dataSource: MatTableDataSource<Error>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private router: Router,
    private errorService: ErrorService,
    private toastService: ToastrService,
    private dialog: MatDialog ) {
  }

  ngOnInit() {
    this.dialog.afterAllClosed.subscribe(() => {
      this.getErrors();
    })
  };

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  getErrors() {
    this.errorService.getErrors()
      .subscribe( data => {
        this.errors = data;
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  public addUser(): Observable<boolean> {
    let dialogRef: MatDialogRef<AddErrorComponent>;
    dialogRef = this.dialog.open(AddErrorComponent, {
      width: '600px',
    });
    return dialogRef.afterClosed();
  }

  public editError(id: string): Observable<boolean> {
    let dialogRef: MatDialogRef<EditErrorComponent>;
    dialogRef = this.dialog.open(EditErrorComponent, {
      data: id,
      width: '600px',
    });
    return dialogRef.afterClosed();
  }

  deleteError(error: Error): void {
    this.errorService.deleteError(error)
      .subscribe( data => {
        this.errors = this.errors.filter(u => u !== error);
        this.toastService.success(`Error ${error.errcode} delete`);
        this.getErrors();
      })
  };

  //Repeated method in error-detail.component
  public addCause(errid: string, errcode: string): Observable<boolean> {
    let dialogRef: MatDialogRef<AddCauseComponent>;
    dialogRef = this.dialog.open(AddCauseComponent, {
      data: [errid, errcode],
      width: '600px',
    });
    return dialogRef.afterClosed();
  }

}
