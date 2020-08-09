import { Component, OnInit } from '@angular/core';
import { AuthService } from "./services/auth.service";
import { Router } from "@angular/router";

declare var $: any;
declare var Swal: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private authService: AuthService, private router: Router){}
  title = 'frontEnd';

  allowedLinks = ["/folders", "/editFolder","/links", "/editLink"];
  searchBarLinks = ["/folders", "/links"];

  ngOnInit():void{
  }

  authLoggedIn(){
    return this.authService.loggedIn();
  }

  authLogout(){
    this.authService.logout();
    this.done();
  }

  isVisible(){
    var temp = this.router.url.split('?')[0];
    if(this.allowedLinks.indexOf(temp) > -1){
      return true;
    }else{
      return false;
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
    if(document.body.style.background === "rgb(54, 60, 70)"){
      document.body.style.background = "none";
    }else{
      document.body.style.background = "#363C46";
    }
  }

  done(){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Success Log out',
      showConfirmButton: false,
      timer: 1500
    });
  }

}
