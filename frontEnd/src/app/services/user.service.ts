import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { UserModel } from "../models/user-model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private URL = "http://localhost:3000/api/users";

  constructor(private http: HttpClient) { }

  addUser(user: UserModel){
    return this.http.post<any>(`${this.URL}/add/`, user);
  }

  getUsers():Observable <any>{
    return this.http.get<any>(`${this.URL}`);
  }
}
