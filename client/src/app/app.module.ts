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
import { ErrorComponent } from './error/error.component';
import { AddErrorComponent} from './error/add-error.component';
import { ErrorService } from './error/error.service';
import { EditUserComponent } from './user/edit-user.component';


@NgModule({
  declarations: [
    AppComponent,
    ListUserComponent,
    AddUserComponent,
    EditUserComponent,
    ErrorComponent,
    AddErrorComponent
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
  ],
  providers: [
    UserService,
    ErrorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
