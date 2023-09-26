import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MainComponent } from './main/main.component';
import { MusicComponent } from './music/music.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { LogoComponent } from './logo/logo.component';
import { AboutComponent } from './about/about.component';
import { MiniGameComponent } from './mini-game/mini-game.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  // {
  //   path:'', redirectTo: 'profile', pathMatch: 'full'
  // },
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'main',
    canActivate: [AuthGuard],
    component: MainComponent,
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    component: ProfileComponent,
  },
  {
    path: 'about',
    canActivate: [AuthGuard],
    component: AboutComponent,
  },
  {
    path: 'favourites',
    canActivate: [AuthGuard],
    component: FavoritesComponent,
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
  }
  ];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})



export class AppRoutingModule {}
