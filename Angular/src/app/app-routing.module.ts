import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MainComponent } from './main/main.component';
import { MusicComponent } from './music/music.component';
import { ProfileComponent } from './profile/profile.component';

import { LogoComponent } from './logo/logo.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },

  {
    path: 'register',
    component: RegisterComponent,
  },

  {
    path: 'main',
    component: MainComponent,
  },

  {
    path: 'music',
    component: MusicComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  }
  ];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})



export class AppRoutingModule {}
