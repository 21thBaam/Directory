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
            this.handleAuthError('Something went wrong!');
            return (err);
          }
          if(err.status === 400){
            this.wrong(err.error["errorMessage"]);
          }
          throw err;
        }
      )
    );
  }

  private handleAuthError(errorMessage){
    localStorage.removeItem("token");
    this.wrong(errorMessage);
    this.router.navigateByUrl('/login');
  }

  wrong(errorMessage){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: errorMessage,
      showConfirmButton: true
    });
  }
}
