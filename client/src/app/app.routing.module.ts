import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListUserComponent } from './user/list-user.component';
import { AddUserComponent } from './user/add-user.component';
import { EditUserComponent } from './user/edit-user.component';

import { ErrorComponent } from './error/error.component';
import { AddErrorComponent } from './error/add-error.component';
import { FindUserComponent } from './user/find-user.component';
import { UserDetailComponent } from './user/user-detail.component';

const routes: Routes = [
  { 
    path: 'users',
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
    path: 'errors',
    component: ErrorComponent
  },
  {
    path: 'addError',
    component: AddErrorComponent
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
