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

const routes: Routes = [
  {
    path:'', redirectTo: 'profile', pathMatch: 'full'
  },
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
    canActivate: [AuthGuard],
    component: MainComponent,
  },

  {
    path: 'music',
    component: MusicComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'mini-game',
    component: MiniGameComponent,
  }
  ];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})



export class AppRoutingModule {}
