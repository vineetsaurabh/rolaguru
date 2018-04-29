import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent } from './user/user.component';
import { AddUserComponent } from './user/add-user.component';
import { EditUserComponent } from './user/edit-user.component';

import { ErrorComponent } from './error/error.component';
import { AddErrorComponent } from './error/add-error.component';

const routes: Routes = [
  { path: 'users', component: UserComponent },
  { path: 'addUser', component: AddUserComponent },
  { path: 'editUser/:id', component: EditUserComponent },
  { path: 'errors', component: ErrorComponent },
  { path: 'addError', component: AddErrorComponent }
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
