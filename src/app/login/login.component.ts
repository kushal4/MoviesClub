import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as jwt_decode from "jwt-decode";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

signIn={
    "email":null,
    "password":null
  };
  errorMsg={
    "email":null,
    "password":null
  };
  show=false;
  constructor(private router:Router,
    private authService:AuthService,private route:ActivatedRoute) { }

  ngOnInit() {
  }

  Login(loginObj){
    let returnUrl=this.route.snapshot.paramMap.get('returnUrl') || '/movie-home';
    let login$=this.authService.login(loginObj);
    this.show=true;
    login$.subscribe(response=>{
      this.errorMsg={ "email":null,
      "password":null};
      this.show=false;
      try {
        let code = response["code"];
        if (code == 200) {
          if (response.hasOwnProperty("access_token")) {
            let token=response["access_token"];
            let decode_token=jwt_decode(token);
            console.log(decode_token);
            localStorage.setItem("access_token", token);
            this.router.navigate([returnUrl]);
          }
        }else{
          if(response.hasOwnProperty("errors")){
              this.errorMsg=response["errors"];
              console.log(this.errorMsg);
          }
        }

      } catch (exception) {
        console.log(exception);
      }
    })
  }

}
