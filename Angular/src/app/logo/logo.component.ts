import { NavbarComponent } from '../navbar/navbar.component';
import { AppModule } from './../app.module';
import { Router, RouterOutlet, RouterModule, RouterState, RouterStateSnapshot } from '@angular/router';
import { AppRoutingModule } from './../app-routing.module';
import { Component } from '@angular/core';
import { Navigation, NavigationEnd,} from '@angular/router';
import { AppComponent } from '../app.component';


@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})

export class LogoComponent {

  constructor(private router: Router) {

  }
}
