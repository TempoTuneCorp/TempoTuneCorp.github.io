import { Component } from '@angular/core';
import { Navigation, NavigationEnd, Router } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TempoTune';
  showLogo: boolean = true;

  constructor(public router: Router) {
    this.router.navigate(['/main'])
    //this.router.navigate(['/login'])

<<<<<<< HEAD
=======
  constructor(private router: Router) {
    this.router.navigate(['/login'])
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (val.url == '/login' || val.url == '/register') {
          this.showLogo = true;
        } else {
          this.showLogo = false;
        }
      }
    });
>>>>>>> 6b804d3f8c5ffe37270ba0862f8a107fa2f88bbd
  }

  // route for button: ((click)="redirect in the html button")
  //
  // redirect(){
  //   this.router.navigate(['/someComponent']);
  //

}
