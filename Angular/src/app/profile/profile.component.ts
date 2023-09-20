import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';





@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit{

  updateUsernameForm: FormGroup;
  updateEmailForm: FormGroup;

  selectedFile: File | null=null;

  public username:string = "";
  public email:string = "";
  public id:string ="";
  public image: string ="";

  editUsernameMode: boolean = false;
  editEmailMode: boolean = false;

  constructor(
    private user: UserService,
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private toast: NgToastService,
    private router: Router
    ){

      this.updateUsernameForm = this.formBuilder.group({
        username: ['', Validators.required]
      });
      this.updateEmailForm = this.formBuilder.group({
        email: ['', Validators.required]
      });

  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
    console.log(this.selectedFile)

    if (this.selectedFile) {
      console.log(this.id)
      this.user.uploadProfilePicture(this.selectedFile, this.id).subscribe({
        next:(res)=> {

          this.user.getPictureUrl(this.id).subscribe({
            next: (base64Data:string) => {
              this.image = 'data:image;base64,' + base64Data;
              this.user.setProfilePicture(this.image);

          }})

          // console.log(res);
          this.toast.success({
            detail: "Success", summary: ('Image uploaded successfully'), duration: 3000
          });
        },
        error:(err)=>{
          console.log(err);
          this.toast.error({
            detail: "Error", summary: err?.error.message, duration: 3000
          });
        }
    });
  }
}

onFavClick(){
  this.router.navigate(['favourites'])
}

  enableEditUsername(){
    this.editUsernameMode = true;
  }

  cancelUsernameUpdate(){
    this.editUsernameMode = false;
  }

  updateUsername(){
    const Id = this.auth.getUserIdFromToken();
    const UserName = this.updateUsernameForm.get('username')?.value;
    const userObj = {Id, UserName}
    console.log(userObj);

    this.user.updateUsername(userObj)
    .subscribe({
      next:(res)=> {
      this.editUsernameMode = false;
      console.log(res);
      this.auth.removeToken(localStorage.getItem('token')); //remove existing token
      this.auth.storeToken(res.token); //get new token
      this.username = this.auth.decodedToken().unique_name; //decode new token and get new username from payload
      this.user.setUsername(this.username); //set new username so it can be shown when onInit
      this.toast.success({
        detail: "Success", summary: res.message, duration: 3000
      });
    },
    error:(err)=>{
      console.log(err);
      this.toast.error({
        detail: "Error", summary: err?.error.message, duration: 3000
      });
    }
  })
  }


  enableEditEmail(){
    this.editEmailMode = true;
  }

  cancelEmailUpdate(){
    this.editEmailMode = false;
  }

  updateEmail(){
    const Id = this.auth.getUserIdFromToken();
    console.log(Id);
    const Email = this.updateEmailForm.get('email')?.value;
    const userObj = {Id, Email}
    console.log(userObj);

    this.user.updateEmail(userObj)
    .subscribe({
      next:(res)=> {
      this.editEmailMode = false;
      console.log(res);
      this.auth.removeToken(localStorage.getItem('token')); //remove existing token
      this.auth.storeToken(res.token); //get new token
      this.email = this.auth.decodedToken().email; //decode new token and get new username from payload
      this.user.setEmail(this.email); //set new username so it can be shown when onInit
      this.toast.success({
        detail: "Success", summary: res.message, duration: 3000
      });
    },
    error:(err)=>{
      console.log(err);
      this.toast.error({
        detail: "Error", summary: err?.error.message, duration: 3000
      });
    }
  })
  }

  updatePassword(){
    if(confirm('Are you sure u want to reset your password?')){
      const emailToReset = {Email: this.email};
    console.log(emailToReset);
      this.auth.sendEmailResetPassword(emailToReset)
    .subscribe({
      next:(res)=> {
      this.toast.success({
        detail: "Success", summary: res.message, duration: 3000
      });

    },
    error:(err)=>{
      console.log(err);
      this.toast.error({
        detail: "Error", summary: err?.error.message, duration: 3000
      });
    }})
  }
}

  async deleteUser(){
    if(confirm('Are you sure u want to delete your user?'))
    {
    const id = this.auth.decodedToken().id;
    console.log(id);

    (await this.user.deleteUserFavorites(id))
    .subscribe({
      next:async (res: { message: any; }) => {

        this.toast.success({
          detail: "Success", summary: res.message, duration: 3000
        });
        (await (this.user.deleteUser(id)))
        .subscribe({
          next:(res: { message: any; }) => {

            this.toast.success({
              detail: "Success", summary: res.message, duration: 3000
            });
            this.auth.signOut();
            this.router.navigate(['login'])
          },
          error:(err: { error: { message: any; }; })=>{
            console.log(err);
            this.toast.error({
              detail: "Error", summary: err?.error.message, duration: 3000
            });
          }
        })
      },
      error:(err: { error: { message: any; }; })=>{
        console.log(err);
        this.toast.error({
          detail: "Error", summary: err?.error.message, duration: 3000
        });
      }
    });



  }}

  ngOnInit(){
    this.user.getUsername().subscribe(val => {
      let usernameFromToken = this.auth.getUsernameFromToken();
    this.username = val || usernameFromToken;
    })


    this.user.getEmail().subscribe ( val=> {
      let emailFromToken = this.auth.getEmailFromToken();
      this.email = val || emailFromToken;
    })

    this.user.getUserId().subscribe ( val=> {
      let idFromToken = this.auth.getUserIdFromToken();
      this.id = val || idFromToken;
    })

    this.user.getPictureUrl(this.id).subscribe({
      next: (base64Data:string) => {
        this.image = 'data:image;base64,' + base64Data;
        this.user.setProfilePicture(this.image);

    }})
    this.user.getProfilePicture().subscribe (val =>{
      this.image = val;
    });
  }
}

