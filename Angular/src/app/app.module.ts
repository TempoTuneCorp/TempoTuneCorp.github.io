import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BackgroundComponent } from './background/background.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LogoComponent } from './logo/logo.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MainComponent } from './main/main.component';
import { MusicComponent } from './music/music.component';
import { ProfileComponent } from './profile/profile.component';

import { NavbarComponent } from './navbar/navbar.component';
import {NgToastModule} from 'ng-angular-popup';
import { TokenInterceptor } from './Interceptors/token.interceptor';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    BackgroundComponent,
    LoginComponent,
    RegisterComponent,
    LogoComponent,
    MainComponent,
    MusicComponent,
    ProfileComponent,
    NavbarComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgToastModule,
    FormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {}
