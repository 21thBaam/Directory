import { Injectable } from '@angular/core';
import { HttpInterceptor } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import { catchError, tap} from 'rxjs/operators';

declare var Swal: any;

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{
  
  constructor(private authService: AuthService, private router: Router) { }

  intercept(req, next) {
    const tokenizeReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authService.getToken()}`
      }
    });
    return next.handle(tokenizeReq).pipe(
      catchError(
        (err, caught) => {
          if (err.status === 401) {
            this.handleAuthError();
            return (err);
          }
          throw err;
        }
      )
    );
  }

  private handleAuthError(){
    localStorage.removeItem("token");
    this.wrong();
    this.router.navigateByUrl('/login');
  }

  wrong(){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: `Something went wrong!`,
      showConfirmButton: true
    });
  }
}
