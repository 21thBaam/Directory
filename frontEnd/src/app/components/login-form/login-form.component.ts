import { Component, OnInit } from '@angular/core';
import { UserModel } from "../../models/user-model";
import { AuthService } from "../../services/auth.service";
import { Router } from '@angular/router';

declare var Swal: any;

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  loginUser: UserModel = {} as UserModel;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  OnSubmit() {
    alert("Works");
    console.log(this.loginUser);
    this.authService.logIn(this.loginUser).subscribe(
        res => { 
          if(res.token){
            localStorage.setItem('token', res.token);
            this.router.navigate(['/test']);
          }else{
            this.Message();
          }
           },
        err => { console.log(err); } );
  }

  Message(){
    Swal.fire(
      'Good job!',
      'You clicked the button!',
      'success'
    );
  }
}
