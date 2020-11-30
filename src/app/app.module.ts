import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {LoginComponent} from './components/login/login.component';
import {Register} from 'ts-node';
import {UserComponent} from './components/user/user.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NotificationModule} from './notification/notification.module';
import {NotificationService} from './notification/notification.service';
import {AuthenticationService} from './service/authentication.service';
import {UserService} from './service/user.service';
import {AuthGuard} from './guard/auth.guard';
import {AuthInterceptor} from './interceptors/auth.interceptor';
import {RegisterComponent} from './components/register/register.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AddApartmentComponent} from './components/add-apartment/add-apartment.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
 

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    AddApartmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NotificationModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ],
  providers: [
    NotificationService,
    AuthenticationService,
    UserService,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
