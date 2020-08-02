import { Component, OnInit } from '@angular/core';
import { AuthService } from "./services/auth.service";
import { Router } from "@angular/router";

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private authService: AuthService, private router: Router){}
  title = 'frontEnd';

  forbiddenLinks = ["/test","/login"];

  ngOnInit():void{
    $(document).ready(() => {

    });
  }

  authLoggedIn(){
    return this.authService.loggedIn();
  }

  authLogout(){
    this.authService.logout();
  }

  isVisible(){
    if(this.forbiddenLinks.indexOf(this.router.url) > -1){
      return false;
    }else{
      return true;
    }
  }

}
