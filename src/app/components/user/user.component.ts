import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, Subscription} from 'rxjs';
import {User} from '../../model/user';
import {FileUploadStatus} from '../../model/file-upload.status';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../service/authentication.service';
import {NotificationService} from '../../notification/notification.service';
import {UserService} from '../../service/user.service';
import {NotificationType} from '../../notification/notification-type.enum';
import {HttpErrorResponse, HttpEvent, HttpEventType} from '@angular/common/http';
import {NgForm} from '@angular/forms';
import {CustomHttpRespone} from '../../model/custom-http-response';
import {Role} from '../../model/role.enum';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
}
