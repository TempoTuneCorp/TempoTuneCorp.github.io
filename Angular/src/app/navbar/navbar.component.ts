import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {DOCUMENT} from "@angular/common"
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private router: Router, private auth: AuthService) {
    window.addEventListener('resize', function() {
      if (window.matchMedia('(min-width: 580px)').matches) {
          const ele = document.getElementById('toggle') as HTMLInputElement;
          ele.checked = false
      }
  }, true);

  }



  onLogoClick(){
    this.router.navigate(['main'])
  }

  onProfileClick(){
    this.router.navigate(['profile'])
  }

  logout(){
    this.auth.signOut();
    this.router.navigate(['login'])
  }

}

