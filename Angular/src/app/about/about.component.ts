import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';


declare function lockJS(params:void):any;

@Component({
  selector: 'app-about',
  styleUrls: ['./about.component.scss'],
  templateUrl: './about.component.html'

})


export class AboutComponent implements OnInit {
  token: any;
  Email: any;
constructor(
  private auth: AuthService,
  private user: UserService,
) {}

ngOnInit(): void {
    let emailFromToken = this.auth.getEmailFromToken();
    this.Email = emailFromToken;
    lockJS();
}


}
