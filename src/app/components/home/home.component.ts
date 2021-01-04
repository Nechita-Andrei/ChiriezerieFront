import { Component, OnInit } from '@angular/core';
import { Apartment } from 'src/app/model/apartment';
import { NgModule } from '@angular/core';
import {AuthenticationService} from '../../service/authentication.service';
import { Router } from '@angular/router';
import { ApartmentService } from 'src/app/service/apartment.service';
import { User } from 'src/app/model/user';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  apartments: Apartment[];
  keyWord: string;
  url: string = "../";

  constructor(private router: Router,
    private authenticationService: AuthenticationService,
    private apartmentService: ApartmentService
    ) { }

  ngOnInit(): void {
    this.keyWord = "";
    this.collectApartments();
    
    if (this.authenticationService.isUserLoggedIn()) {
      this.router.navigateByUrl('/home');
    } else {
      this.router.navigateByUrl('/login');
    }
    

    
  }

  

  collectApartments(){
    console.log(this.keyWord);
    this.apartmentService.getAll().subscribe(
      (res) => {
        this.apartments = res.filter(
          (a) => {
            
            return a.city.includes(this.keyWord);}
        );
      
      }
    );
    
  }

}
