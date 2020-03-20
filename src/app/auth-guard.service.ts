import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router:Router) { }

  canActivate(route, state:RouterStateSnapshot){
    let access_token=localStorage.getItem('access_token');
    if(access_token) return true;
    this.router.navigate(['/login'],{queryParams:{"returnUrl":state.url}})
    return false;
  }
}
