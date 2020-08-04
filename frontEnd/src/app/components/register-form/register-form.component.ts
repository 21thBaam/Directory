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
  confirmPassword = "";

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
  }

  OnSubmit(){
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
}
