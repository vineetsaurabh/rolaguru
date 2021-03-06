import { CauseComponent } from './cause/cause.component';
import { HomepageComponent } from './login/homepage.component';

import {
    NgModule
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
import { TableConfiguratorComponent } from './util/table-configurator.component';
import { HeaderComponent } from './common/header.component';
import { FindErrorResultComponent } from './error/find-error-result.component';
import { SubscribedErrorsComponent } from './error/subscribe-error.component';
import { ReportService } from './report/report.service';
import { SearchReportMonthwiseComponent } from './report/search-report-monthwise.component';
import { SearchReportInputwiseComponent } from './report/search-report-inputwise.component';
import { RcaReportComponent } from './report/rca-report.component';
import { ChatComponent } from './chat/chat.component';
import { ReadMoreComponent } from './util/read-more.component';
import 'hammerjs';
import { AssignRoleComponent } from './user/assign-role.component';
import { RoleService } from './role/role.service';
import { AddRoleComponent } from './role/add-role.component';
import { ListRoleComponent } from './role/list-role.component';
import { EditRoleComponent } from './role/edit-role.component';
import { AssignTeamComponent } from './user/assign-team.component';
import { TeamService } from './team/team.service';
import { AddTeamComponent } from './team/add-team.component';
import { ListTeamComponent } from './team/list-team.component';
import { EditTeamComponent } from './team/edit-team.component';
import { AddPriorityTypeComponent } from './priority-type/add-priority-type.component';
import { ListPriorityTypeComponent} from './priority-type/list-priority-type.component';
import { EditPriorityTypeComponent } from './priority-type/edit-priority-type.component';
import { PriorityTypeService } from './priority-type/priority-type.service';
import { DomainService } from './domain/domain.service';
import { AddDomainComponent } from './domain/add-domain.component';
import { ListDomainComponent } from './domain/list-domain.component';
import { EditDomainComponent } from './domain/edit-domain.component';
import { ModuleService } from './module/module.service';
import { AddModuleComponent } from './module/add-module.component';
import { ListModuleComponent } from './module/list-module.component';
import { EditModuleComponent } from './module/edit-module.component';
import { UserPreferenceComponent } from './user-preference/user-preference.component';
import { UserPreferenceService } from './user-preference/user-preference.service';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        HeaderComponent,
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
        ConfirmDeleteComponent,
        TableConfiguratorComponent,
        FindErrorResultComponent,
        SubscribedErrorsComponent,
        SearchReportMonthwiseComponent,
        SearchReportInputwiseComponent,
        RcaReportComponent,
        ReadMoreComponent,
        ChatComponent,
        AssignRoleComponent,
        AddRoleComponent,
        EditRoleComponent,
        ListRoleComponent,
        AssignTeamComponent,
        AddTeamComponent,
        EditTeamComponent,
        ListTeamComponent,
        AddPriorityTypeComponent, ListPriorityTypeComponent, EditPriorityTypeComponent,
        AddDomainComponent, ListDomainComponent, EditDomainComponent,
        AddModuleComponent, ListModuleComponent, EditModuleComponent,
        UserPreferenceComponent,
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
        ReportService,
        TokenStorage,
        RoleService,
        TeamService,
        PriorityTypeService,
        DomainService, ModuleService,
        UserPreferenceService,
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
