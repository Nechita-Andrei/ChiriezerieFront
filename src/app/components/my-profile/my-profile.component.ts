import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apartment } from 'src/app/model/apartment';
import { SimpleUser } from 'src/app/model/simpleUser';
import { User } from 'src/app/model/user';
import { ApartmentService } from 'src/app/service/apartment.service';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { UtilsService } from 'src/app/service/utils.service';
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
  msg = '';
  urls = new Array<string>();
  files = [];

  constructor(private router: Router, private http: HttpClient, private authenticationService: AuthenticationService, private route: ActivatedRoute,
    private utilsService: UtilsService) {
  }

  ngOnInit(): void {
    if (!this.authenticationService.isUserLoggedIn()) {
      this.router.navigateByUrl('/login');
    }
    

    this.collectUserInfo();

    this.getApartments();

    
  }

  getApartments() {
    console.log(this.apartments);
  }

  getUser(id?: string) {
    if (id) {
      return this.http.get<SimpleUser>(`${this.host}/users/` + id);
    }
    return this.http.get<SimpleUser>(`${this.host}/user`);
  }

  checkUser(){
    return !this.route.snapshot.params.id;
  }

  collectUserInfo() {

    this.getUser(this.route.snapshot.params.id).subscribe(
      (res) => {
        this.user = {
          id: res.id,
          name: res.name,
          phoneNumber: res.phoneNumber,
          email: res.email,
          profilePicture: res.profilePicture,
          apartments: res.apartments,

        }
        this.getSource();
        this.apartments = res.apartments;
      }

    );
  }

  public getSource() {
    
    if (!this.user || !this.user.profilePicture) {
      this.urls = ['../../../assets/avatar_placeholder.png']
    }
    else{
      this.urls = [this.user.profilePicture];
    }
    
  }

  public changePicture(e) {
    this.msg = "";
    for (let index = 0; index < e.target.files.length; index++) {

      var mimeType = e.target.files[index].type;

      if (mimeType.match(/image\/*/) == null) {
        if (this.msg === "") {
          this.msg = "<p>Only images are supported!</p>"
        }
        this.msg += "<p>" + e.target.files[index].name + " is not valid!</p>";

      } else {
        this.files = [e.target.files[index]];
      }
    }

    this.urls = [];

    for (let file of this.files) {

      let reader = new FileReader();
      reader.onload = (e: any) => {
        this.urls.push(e.target.result);
      }

      reader.readAsDataURL(file);
    }



    //this.addProfilePicture();

  }

  public addProfilePicture() {
    this.user.profilePicture = this.urls[0];
    this.http.put<SimpleUser>(`${this.host}/users/picture`, { "id": this.user.id, "profilePicture": this.user.profilePicture }).subscribe(value => {
      this.utilsService.openSuccesSnackBar("Poza ta de profil a fost schimbata cu succes!")
    });
  }

  public logout() {
    console.log("Logging out ...");
    this.authenticationService.logout();
  }


}
