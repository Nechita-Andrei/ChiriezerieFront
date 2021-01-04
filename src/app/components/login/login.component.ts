import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../service/authentication.service';
import {NotificationService} from '../../notification/notification.service';
import {User} from '../../model/user';
import {Subscription} from 'rxjs';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {NotificationType} from '../../notification/notification-type.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  public showLoading: boolean;
  private subscriptions$: Subscription[] = [];
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    if (this.authenticationService.isUserLoggedIn()) {
      this.router.navigateByUrl('/user/management');
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  onLogin(user: User): void {
    this.showLoading = true;
    console.log(user);
    this.subscriptions$.push(this.authenticationService.login(user)
      .subscribe((response: User) => {
        const token = response.accessToken;
        this.authenticationService.saveToken(token);
        // body is the user
        this.authenticationService.addUserToLocalStorage(response);
        this.router.navigateByUrl('/home');
        this.showLoading = false;
      }, (httpErrorResponse: HttpErrorResponse) => {
        console.log(httpErrorResponse);
        this.sendErrorNotification(NotificationType.ERROR, httpErrorResponse.error.message);
        this.showLoading = false;
        }
      ));
  }

  ngOnDestroy(): void {
    this.subscriptions$.forEach(sub => sub.unsubscribe());
  }

  private sendErrorNotification(notificationType: NotificationType, message: string): void {
    if (message != null) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, 'AN ERROR OCCURED. PLEASE TRY AGAIN.');
    }
  }
}
