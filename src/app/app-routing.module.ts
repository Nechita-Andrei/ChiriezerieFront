import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {AddApartmentComponent} from './components/add-apartment/add-apartment.component';
import {RegisterComponent} from './components/register/register.component';
import {UserComponent} from './components/user/user.component';
import {AuthGuard} from './guard/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { AnnouncementComponent } from './components/announcement/announcement.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'user', component: UserComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {
    path: 'add-apartment', 
    component: AddApartmentComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'announcement', 
    component: AnnouncementComponent
    // canActivate: [AuthGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
