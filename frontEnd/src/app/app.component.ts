import { Component, OnInit } from '@angular/core';
import { AuthService } from "./services/auth.service";
import { Router } from "@angular/router";
import { stringify } from 'querystring';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private authService: AuthService, private router: Router){}
  title = 'frontEnd';

  forbiddenLinks = ["/test","/login","/login/loginForm","/login/registerForm"];
  searchBarLinks = ["/folders", "/links"];

  ngOnInit():void{
    /* $(document).ready(() => {
    }); */
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

  searchBarVisible(){
    var temp = this.router.url.split('?')[0];
    if(this.searchBarLinks.indexOf(temp) > -1){
      return true;
    }else{
      return false;
    }
  }

  theme(){
    console.log(document.body.style.background);
    if(document.body.style.background === "rgb(54, 60, 70)"){
      document.body.style.background = "none";
    }else{
      document.body.style.background = "#363C46";
    }
  }

}
