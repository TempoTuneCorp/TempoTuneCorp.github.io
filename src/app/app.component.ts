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

  }


  // route for button: ((click)="redirect in the html button")
  //
  // redirect(){
  //   this.router.navigate(['/someComponent']);
  // }
}
