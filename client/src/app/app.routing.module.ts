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

const routes: Routes = [
  {
    path : '',
    component : LoginComponent
  },
  { 
    path: 'login',
    component: LoginComponent
  },
  {
    path : 'homepage',
    component : HomepageComponent
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
        component: AddCauseComponent
      },
      {
        path: '',
        component: ConfirmDeleteComponent
      }
    ]
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
