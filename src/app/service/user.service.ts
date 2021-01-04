import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpEvent} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable, of} from 'rxjs';
import {User} from '../model/user';
import {SimpleUser} from '../model/simpleUser';
import {CustomHttpRespone} from '../model/custom-http-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUser(id: string): Observable<SimpleUser> {
    return of({
      id: "1",
      name: "Wladislav Putin",
      email: "putin@russia.ru",
      phoneNumber: "0749696900",
      picture: ""
    })
    // return this.http.get<SimpleUser>(`${this.host}/users/${id}`)
  }
}
