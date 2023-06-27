import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';




@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit{

  updateUsernameForm: FormGroup;


  public username:string = "";
  public email:string = "";
  public userId: number | undefined;
  public updatedUsername: any;
  editMode: boolean = false;

  constructor(
    private user: UserService, 
    private auth: AuthService,
    private formBuilder: FormBuilder){

      this.updateUsernameForm = this.formBuilder.group({
        username: ['', Validators.required]
      });

  }

  
  enableEditUsername(){
    this.editMode = true;
    // this.updatedUsername = this.username;
    const userData = localStorage.getItem('token');
  
  }

  updateUsername(){
    this.editMode = false;
    const Id = this.auth.getUserIdFromToken();
    const UserName = this.updateUsernameForm.get('username')?.value;
    console.log(this.auth.getUsernameFromToken());
    console.log(UserName);
    console.log(Id);
    
    const userObj = {Id, UserName}
    console.log(userObj);
    this.user.updateUsername(userObj)
    .subscribe( () => {
      this.updatedUsername = UserName;
    })
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

    
    }
    
}


