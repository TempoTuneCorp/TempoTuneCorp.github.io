import { Component } from '@angular/core';
import { Navigation, NavigationEnd, Router } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TempoTune';
  showLogin: boolean = false;
  showRegister: boolean = false;


  constructor(private router: Router) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (val.url == '/login') {
          this.showRegister = false;
          this.showLogin = true;
        } else if (val.url == '/register') {
          this.showLogin = false;
          this.showRegister = true;
        }
      }
    })
  }
}
