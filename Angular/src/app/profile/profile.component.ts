import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';




@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit{

  


  public username:string = "";
  public email:string = "";
  public updatedUsername: any;
  editMode: boolean = false;

  constructor(private user: UserService, private auth: AuthService){
  

  }

  
  enableEditUsername(){
    this.editMode = true;
    this.updatedUsername = this.username;
  }

  updateUser(){
    
    this.username = this.updatedUsername;
    
  }

  cancelUpdate(){
    this.editMode = false;
  }

  ngOnInit(){
    this.user.getUsername().subscribe(val => { 
      let usernameFromToken = this.auth.getUsernameFromToken();
    this.username = val || usernameFromToken;
    })
    

    this.user.getEmail().subscribe ( val=> {
      let emailFromToken = this.auth.getEmailFromToken();
      this.email = val || emailFromToken;
    })


    // this.user.getUsername()
    // .subscribe(val =>{
    //   let usernameFromToken = this.auth.getUsernameFromToken();
    //   this.username = val || usernameFromToken;
    // });
    
    }
    
}


