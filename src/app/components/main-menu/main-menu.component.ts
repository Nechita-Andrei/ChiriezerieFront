import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent {
  @Input() currentPage: string;
  url = "../"

  constructor(
    private router: Router
  ) {}

  ngInit(){
    if(this.currentPage == "home"){
      
    }
  }
}
