
import { NgModule,
  Component,
  Pipe,
  OnInit } from '@angular/core';
import { ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { ToastrModule, ToastContainerModule } from 'ngx-toastr';

import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';

import { ListUserComponent } from './user/list-user.component';
import { AddUserComponent } from './user/add-user.component';
import { UserService } from './user/user.service';
import { ListErrorComponent } from './error/list-error.component';
import { AddErrorComponent} from './error/add-error.component';
import { EditErrorComponent } from './error/edit-error.component';
import { FindErrorComponent } from './error/find-error.component';
import { ErrorDetailComponent } from './error/error-detail.component';
import { ErrorService } from './error/error.service';
import { EditUserComponent } from './user/edit-user.component';
import { FindUserComponent } from './user/find-user.component';
import { UserDetailComponent } from './user/user-detail.component';
import { AddCauseComponent } from './cause/add-cause.component';
import { CauseService } from './cause/cause.service';

import {CdkTableModule} from '@angular/cdk/table';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    ListUserComponent,
    AddUserComponent,
    EditUserComponent,
    ListErrorComponent,
    AddErrorComponent,
    EditErrorComponent,
    FindErrorComponent,
    ErrorDetailComponent,
    FindUserComponent,
    UserDetailComponent,
    AddCauseComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    HttpModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    ToastContainerModule,

    CdkTableModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
  ],
  providers: [
    UserService,
    ErrorService,
    CauseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
