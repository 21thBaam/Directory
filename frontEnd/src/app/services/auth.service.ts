import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

private URL = "http://localhost:3000";

  constructor(private http: HttpClient, private router: Router) { }

  logIn(user){
    return this.http.post<any>(`${this.URL}/api/users/`, user);
  }

  loggedIn(): Boolean{
    if(localStorage.getItem("token")){
      return !!localStorage.getItem("token");
    }
  }

  logout(){
    localStorage.removeItem("token");
    this.router.navigate(["/login"]);
  }  

  getToken(){
    return localStorage.getItem("token");
  }

  getUsers(){
    return this.http.get<any>(`${this.URL}/api/users`);
  }
}
