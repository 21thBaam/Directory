import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap} from "@angular/router";

@Component({
  selector: 'app-login-registro',
  templateUrl: './login-registro.component.html',
  styleUrls: ['./login-registro.component.css']
})
export class LoginRegistroComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

  showLoginForm(){
    this.router.navigate(["loginForm"], {relativeTo: this.route});
  }

  showRegisterForm(){
    this.router.navigate(["registerForm"], {relativeTo: this.route});
  }

}
