import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SimpleUser } from 'src/app/model/simpleUser';
import { User } from 'src/app/model/user';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  user: SimpleUser;
  private host = environment.apiUrl;

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.getUser().subscribe(
      (res) =>{
        this.user  = {
          id: res.id,
          name: res.name,
          phoneNumber: res.phoneNumber,
          email: res.email,
          picture: res.picture
        }
      }
    );
  }

  getUser(){
    return this.http.get<SimpleUser>(`${this.host}/user`);
  }

}
