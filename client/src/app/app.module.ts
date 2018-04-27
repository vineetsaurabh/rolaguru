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
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';

import { UserComponent } from './user/user.component';
import {AddUserComponent} from './user/add-user.component';
import {UserService} from './user/user.service';
import { ErrorComponent } from './error/error.component';
import {AddErrorComponent} from './error/add-error.component';
import { ErrorService } from './error/error.service';



@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    AddUserComponent,
    ErrorComponent,
    AddErrorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    HttpModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [
    UserService,
    ErrorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
