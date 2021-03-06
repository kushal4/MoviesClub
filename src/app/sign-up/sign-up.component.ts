import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import * as jwt_decode from "jwt-decode";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  createAccount = {
    "name": null,
    "email": null,
    "password": null
  };
  show=false;
  errMsg={};
  constructor(private authService:AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  signUp(signUpObj) {
    console.log(signUpObj);
    this.show=true;
    let signUp$=this.authService.register(signUpObj);
    signUp$.subscribe(response => {
      console.log(response);
      this.errMsg={};
      this.show=false;
      
      try {
        let code = response["code"];
        if (code == 200) {
          if (response.hasOwnProperty("access_token")) {
            let token=response["access_token"];
            let decode_token=jwt_decode(token);
            console.log(decode_token);
            localStorage.setItem("access_token",token );
            this.router.navigate(['/movie-home']);
          }

        }else{
          if(response.hasOwnProperty("errors")){
              this.errMsg=response["errors"];
              console.log(this.errMsg);
          }
        }

      } catch (exception) {
        console.log(exception);
      }
    })
  }

}
