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



  constructor(private router: Router) {
    this.router.navigate(['/main'])
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (val.url == '/login' || val.url == '/register') {
          this.showLogo = true;
        } else {
          this.showLogo = false;
        }
      }
    });
  }

  // route for button: ((click)="redirect in the html button")
  //
  // redirect(){
  //   this.router.navigate(['/someComponent']);
  //

}
