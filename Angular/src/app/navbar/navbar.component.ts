import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import {DOCUMENT} from "@angular/common"
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public id:string ="";
  public image: string =""; 

  constructor(private router: Router, private auth: AuthService, private user: UserService) 
  {
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

  onAboutClick(){
    this.router.navigate(['about'])
  }
  logout(){
    this.auth.signOut();
    this.router.navigate(['login'])
  }

  onFavClick(){
    this.router.navigate(['favourites'])
  }



  ngOnInit(): void {

    this.user.getUserId().subscribe ( val=> {
      let idFromToken = this.auth.getUserIdFromToken();
      this.id = val || idFromToken;
    })


    this.user.getProfilePicture().subscribe(val => {
    this.image = val;
   })
  }
}

