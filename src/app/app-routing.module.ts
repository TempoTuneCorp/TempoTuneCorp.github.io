import { NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MainComponent } from './main/main.component';
import { MusicComponent } from './music/music.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { AboutComponent } from './about/about.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { VerifyComponent } from './verify/verify.component';

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
  },
  {
    path: '.well-known/pki-validation/41FED3C4B6E3E9B25C44DEA7A9ED1FDC.txt',
    
  }
  ];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})



export class AppRoutingModule {}
