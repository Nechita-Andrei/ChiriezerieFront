import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../model/user';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../service/authentication.service';
import {NotificationService} from '../../notification/notification.service';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {NotificationType} from '../../notification/notification-type.enum';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
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
    }
  }

  onRegister(user: User): void {
    this.showLoading = true;
    console.log(user);
    this.subscriptions$.push(this.authenticationService.register(user)
      .subscribe((response: User) => {
          this.showLoading = false;
          this.sendNotification(NotificationType.SUCCESS, `A new account was created`);
        }, (httpErrorResponse: HttpErrorResponse) => {
          console.log(httpErrorResponse);
          this.sendNotification(NotificationType.ERROR, httpErrorResponse.error.message);
          this.showLoading = false;
        }
      ));
  }

  ngOnDestroy(): void {
    this.subscriptions$.forEach(sub => sub.unsubscribe());
  }

  private sendNotification(notificationType: NotificationType, message: string): void {
    if (message != null) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, 'AN ERROR OCCURED. PLEASE TRY AGAIN.');
    }
  }
}
