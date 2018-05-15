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
import { FindErrorComponent } from './error/find-error.component';

const routes: Routes = [
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
    path: 'findError',
    component: FindErrorComponent,
    children: [
      { 
        path: ':id',
        component: ErrorDetailComponent
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
