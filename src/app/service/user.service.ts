import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpEvent} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {User} from '../model/user';
import {CustomHttpRespone} from '../model/custom-http-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }
}
