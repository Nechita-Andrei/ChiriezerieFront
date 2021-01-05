import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apartment } from 'src/app/model/apartment';
import { SimpleUser } from 'src/app/model/simpleUser';
import { User } from 'src/app/model/user';
import { ApartmentService } from 'src/app/service/apartment.service';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  user: SimpleUser;
  private host = environment.apiUrl;
  apartments: Apartment[];

  constructor(private router: Router, private http: HttpClient, private authenticationService: AuthenticationService,) { }

  ngOnInit(): void {
    this.collectUserInfo();
    
    this.getApartments();
  }

  getApartments(){
    console.log(this.apartments);
  }

  getUser(){
    return this.http.get<SimpleUser>(`${this.host}/user`);
  }

  collectUserInfo(){
    this.getUser().subscribe(
      (res) =>{
        this.user  = {
          id: res.id,
          name: res.name,
          phoneNumber: res.phoneNumber,
          email: res.email,
          picture: res.picture,
          apartments: res.apartments
          
        }
        console.log(res.apartments);
        this.apartments = res.apartments;
        console.log(this.apartments);
      }
      
    );
  }

  public logout(){
      console.log("Logging out ...");
      this.authenticationService.logout();
  }


}
