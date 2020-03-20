import { BrowserModule } from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import {FormsModule}  from '@angular/forms';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MovieHomeComponent } from './movie-home/movie-home.component';
import { LoaderComponent } from './loader/loader.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard.service';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { MovieComponent } from './movie/movie.component';
import { AuthInterceptor } from './interceptors/AuthInterceptor';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    MovieHomeComponent,
    LoaderComponent,
    BsNavbarComponent,
    SideNavComponent,
    MovieComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    RouterModule.forRoot([
      {
        "path":"",
        "component":LoginComponent
      },
      {
        "path":"login",
        "component":LoginComponent
      },
      {
        "path":"sign-up",
        "component":SignUpComponent
      },
      {
        "path":"movie-home",
        "component":MovieHomeComponent,
        "canActivate":[AuthGuard]
      }
    ]),
    BrowserAnimationsModule
  ],
  providers: [AuthService,
  AuthGuard,
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule { }
