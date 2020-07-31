import { Component, OnInit } from '@angular/core';
import { UserModel } from "../../models/user-model";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  registerUser: UserModel = {} as UserModel;
  confirmPassword = "";

  constructor() { }

  ngOnInit(): void {
  }

  OnSubmit(){
    if(this.Validations()){
      alert("Works");
      console.log(this.registerUser);
    }else{
      alert("Contra fea che");
    }
  }

  Validations(){
    if(this.registerUser.password !== this.confirmPassword){
      return false;
    }

    return true;
  }
}
