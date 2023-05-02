import { Component } from '@angular/core';
import { Navigation, NavigationEnd, Router } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TempoTune';



  constructor(private router: Router) {
    this.router.navigate(['/login'])
  }


  // route for button: ((click)="redirect in the html button")
  //
  // redirect(){
  //   this.router.navigate(['/someComponent']);
  // 
  
}
