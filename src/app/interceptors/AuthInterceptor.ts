import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest,HttpErrorResponse } from '@angular/common/http';
import { Observable,BehaviorSubject } from "rxjs";
import {tap,mergeMap,filter,take} from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null)
  constructor(public authService: AuthService,private router:Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("call interceptor");
    if (this.authService.getJwtToken()) {
      request = this.addToken(request, this.authService.getJwtToken());
    }

    // return next.handle(request).pipe(catchError(error => {
    //   console.log(error);
    //   if (error instanceof HttpErrorResponse && error.status === 401) {
    //     console.log("401 error");
    //     return this.handle401Error(request, next);
    //   } else {
    //     return throwError(error);
    //   }
    // }));
    return next.handle(request).pipe( tap(() => {},
    (err: any) => {
    if (err instanceof HttpErrorResponse) {
      console.log(err.status);
      if (err.status !== 401) {
       return;
      }
      return this.handle401Error(request, next);
    }
  }));
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {


      this.isRefreshing = true;
      //this.refreshTokenSubject.next(null);
      console.log("handleError called");
      localStorage.removeItem("access_token");
      this.router.navigate(['login']);
      // return this.authService.refreshToken().subscribe(data => {
      //     console.log("called");
      //     //If reload successful update tokens
      //     if (data["status"] == 200) {
      //       //Update tokens
      //       localStorage.setItem("access_token", data["access_token"]);
      //       //localStorage.setItem("refreshToken", data.access_token);
      //       //Clone our fieled request ant try to resend it
      //       // request = request.clone({
      //       //   setHeaders: {
      //       //     'Authorization': `Bearer ${data.access_token}`
      //       //   }
      //       // });

      //     }else {
      //       //Logout from account
      //     }
      //   }
     // );
}

}
