import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent{

  public users:any = [];
  constructor(private user: UserService){}

  noOnInit(){
    this.user.getUsers()
    .subscribe(res =>{
      this.users = res;
    })
  }

}
