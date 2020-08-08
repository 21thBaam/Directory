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

  onSubmit() {
    this.authService.logIn(this.loginUser).subscribe(
        res => { 
          if(res.token){
            this.success(res);
          }
           },
        err => { console.log(err); } );
  }

  success(value){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Successful login',
      showConfirmButton: false,
      timer: 1500
    }).then(res => {
      localStorage.setItem('token', value.token);
      this.router.navigate(['/folders']);
    });
  }
}
