import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListUserComponent } from './user/list-user.component';
import { AddUserComponent } from './user/add-user.component';
import { EditUserComponent } from './user/edit-user.component';

import { ListErrorComponent } from './error/list-error.component';
import { AddErrorComponent } from './error/add-error.component';
import { FindUserComponent } from './user/find-user.component';
import { UserDetailComponent } from './user/user-detail.component';
import { EditErrorComponent } from './error/edit-error.component';
import { ErrorDetailComponent } from './error/error-detail.component';
import { AddCauseComponent } from './cause/add-cause.component';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './login/homepage.component';
import { ConfirmDeleteComponent } from './util/confirm-delete.component';
import { TableConfiguratorComponent } from './util/table-configurator.component';
import { FindErrorResultComponent } from './error/find-error-result.component';
import { SubscribedErrorsComponent } from './error/subscribe-error.component';
import { SearchReportMonthwiseComponent } from './report/search-report-monthwise.component';
import { SearchReportInputwiseComponent } from './report/search-report-inputwise.component';
import { RcaReportComponent } from './report/rca-report.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'homepage',
        component: HomepageComponent
    },
    {
        path: 'findUsers',
        component: FindErrorResultComponent
    },
    {
        path: 'listUsers',
        component: ListUserComponent,
        children: [
            {
                path: ':id',
                component: EditUserComponent
            }
        ]
    },
    {
        path: 'findUser',
        component: FindUserComponent,
        children: [
            {
                path: ':id',
                component: UserDetailComponent
            },
            {
                path: '',
                component: ConfirmDeleteComponent
            }
        ]
    },
    {
        path: 'addUser',
        component: AddUserComponent
    },
    {
        path: 'listErrors',
        component: ListErrorComponent,
        children: [
            {
                path: ':id',
                component: EditErrorComponent
            },
            {
                path: '',
                component: TableConfiguratorComponent
            }
        ]
    },
    {
        path: 'addError',
        component: AddErrorComponent
    },
    {
        path: 'findError/:id',
        component: ErrorDetailComponent,
        children: [
            {
                path: ':id',
                component: AddCauseComponent,
                children: [
                    {
                        path: '',
                        component: ConfirmDeleteComponent
                    }
                ]
            }
        ]
    },
    {
        path: 'subscribedErrors',
        component: SubscribedErrorsComponent
    },
    {
        path: 'searchReportMonthwise',
        component: SearchReportMonthwiseComponent
    },
    {
        path: 'searchReportInputwise',
        component: SearchReportInputwiseComponent
    },
    {
        path: 'rcaReport',
        component: RcaReportComponent
    },
    {
        path: 'chat',
        component: ChatComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    declarations: []
})
export class AppRoutingModule { }
