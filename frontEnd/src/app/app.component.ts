import { Component } from '@angular/core';
import { AuthService } from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private authService: AuthService){}
  title = 'frontEnd';

  authLoggedIn(){
    return this.authService.loggedIn();
  }

  authLogout(){
    this.authService.logout();
  }
}
