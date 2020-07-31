import { Component, OnInit } from '@angular/core';
import { UserModel } from "../../models/user-model";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  loginUser: UserModel = {} as UserModel;

  constructor() { }

  ngOnInit(): void {
  }

  OnSubmit(){
    alert("Works");
    console.log(this.loginUser);
  }
}
