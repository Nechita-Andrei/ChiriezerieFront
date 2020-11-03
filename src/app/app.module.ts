import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {LoginComponent} from './components/login/login.component';
import {Register} from 'ts-node';
import {UserComponent} from './components/user/user.component';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NotificationModule} from './notification/notification.module';
import {NotificationService} from './notification/notification.service';
import {AuthenticationService} from './service/authentication.service';
import {UserService} from './service/user.service';
import {AuthGuard} from './guard/auth.guard';
import {AuthInterceptor} from './interceptors/auth.interceptor';
import {RegisterComponent} from './components/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NotificationModule,
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
