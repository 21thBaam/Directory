import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

private URL = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  logIn(user){
    return this.http.post<any>(`${this.URL}/api/users/`, user);
  }

}
