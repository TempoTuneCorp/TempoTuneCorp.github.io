import { Component} from '@angular/core';
import { Navigation, NavigationEnd, Router } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'TempoTune';
  showNavbar: boolean = true;

  constructor(private router: Router) {

    // this.router.navigate(['/login'])

    
  }

}
