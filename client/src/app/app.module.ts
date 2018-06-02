import { CauseComponent } from './cause/cause.component';
import { HomepageComponent } from './login/homepage.component';

import {
    NgModule,
    Component,
    Pipe,
    OnInit
} from '@angular/core';
import {
    ReactiveFormsModule,
    FormsModule,
    FormGroup,
    FormControl,
    Validators,
    FormBuilder
} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { ToastrModule, ToastContainerModule } from 'ngx-toastr';
import { NgxEditorModule } from 'ngx-editor';
import { MomentModule } from 'angular2-moment';

import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ListUserComponent } from './user/list-user.component';
import { AddUserComponent } from './user/add-user.component';
import { UserService } from './user/user.service';
import { ListErrorComponent } from './error/list-error.component';
import { AddErrorComponent } from './error/add-error.component';
import { EditErrorComponent } from './error/edit-error.component';
import { ErrorDetailComponent } from './error/error-detail.component';
import { ErrorService } from './error/error.service';
import { EditUserComponent } from './user/edit-user.component';
import { FindUserComponent } from './user/find-user.component';
import { UserDetailComponent } from './user/user-detail.component';
import { AddCauseComponent } from './cause/add-cause.component';
import { CauseService } from './cause/cause.service';

import { FlexLayoutModule } from '@angular/flex-layout';
import { CdkTableModule } from '@angular/cdk/table';
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
    MAT_DIALOG_DATA,
    MatDialogRef,
} from '@angular/material';
import { AuthService } from './login/auth.service';
import { TokenStorage } from './login/token.storage';
import { AuthInterceptor } from './login/auth.inteceptor';
import { ListCauseComponent } from './cause/list-cause.compnent';
import { CommentErrorComponent } from './error/comment-error.component';
import { CommentErrorService } from './error/comment-error.service';
import { ListErrorCommentComponent } from './error/list-comment-error.component';
import { ConfirmDeleteComponent } from './util/confirm-delete.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        HomepageComponent,
        ListUserComponent,
        AddUserComponent,
        EditUserComponent,
        ListErrorComponent,
        AddErrorComponent,
        EditErrorComponent,
        ErrorDetailComponent,
        FindUserComponent,
        UserDetailComponent,
        AddCauseComponent,
        ListCauseComponent,
        CauseComponent,
        CommentErrorComponent,
        ListErrorCommentComponent,
        ConfirmDeleteComponent
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
        FlexLayoutModule,
        NgxEditorModule,
        MomentModule,

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
        MatTooltipModule
    ],
    providers: [
        UserService,
        ErrorService,
        CauseService,
        CommentErrorService,
        AuthService,
        TokenStorage,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
