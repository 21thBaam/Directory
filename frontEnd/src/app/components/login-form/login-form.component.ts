import { Component, OnInit } from '@angular/core';
import { UserModel } from "../../models/user-model";
import { AuthService } from "../../services/auth.service";
import { Router } from '@angular/router';

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
        res => { console.log(res);
          this.router.navigate(['/test']); },
        err => { console.log(err); } );
  }
}
