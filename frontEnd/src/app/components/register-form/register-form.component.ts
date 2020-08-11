import { Component, OnInit } from '@angular/core';
import { UserModel } from "../../models/user-model";
import { ActivatedRoute, Router} from "@angular/router";
import { UserService } from "../../services/user.service";

declare var Swal: any;

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  registerUser: UserModel = {} as UserModel;
  usernames: any;
  confirmPassword = "";

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(res => {this.usernames = res;});
  }

  OnSubmit(){
    this.userService.getUsers().subscribe(
      res => {
        this.usernames = res;
        if(this.validatorUsername()){
          if(this.Validations()){
            this.userService.addUser(this.registerUser).subscribe(
              res => {
                this.success();
                this.registerUser = {} as UserModel;
                this.router.navigate(["login/loginForm"]);
              });
          }else{
            this.failed();
          }
        }
      });
  }

  Validations(){
    if(this.registerUser.password !== this.confirmPassword){
      return false;
    }
    return true;
  }

  success(){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your register has been saved',
      showConfirmButton: false,
      timer: 1500
    });
  }

  failed(){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: `Your Password and Confirm Password doesn't match`
    });
  }

  validatorUsername(){
    var temp = (<HTMLInputElement>document.getElementById("nameUser")).value;
    for(let name in this.usernames){
      if(temp.toLowerCase() == this.usernames[name]["username"].toLowerCase()){
        document.getElementById("existUN").innerHTML = "That Username already exist";
        document.getElementById("existUN").style.display = ""; 
        return true;
      }else{
        document.getElementById("existUN").style.display = "none"; 
      }
    }
    return true;
  }
}
