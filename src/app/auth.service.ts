import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  signup_url="http://localhost:8000/api/register";
  login_url="http://localhost:8000/api/auth/login";
  refresh_url="http://localhost:8000/api/refresh";
  constructor(private httpClient: HttpClient) { }

  register(signUpObj){
    return this.httpClient.post(this.signup_url, signUpObj);
  }

  login(loginObj){
    return this.httpClient.post(this.login_url, loginObj);
  }

  getJwtToken(){
    return localStorage.getItem("access_token");
  }

  refreshToken(){
    return this.httpClient.post(this.refresh_url,{});
  }

}
