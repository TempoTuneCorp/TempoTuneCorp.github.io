import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ImageCropperComponent } from '../image-cropper/image-cropper.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs/internal/Observable';





@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit{

  updateUsernameForm: FormGroup;
  updateEmailForm: FormGroup;

  selectedFile: File | any;

  public username:string = "";
  public email:string = "";
  public id:any;

  file: string = '';

  editUsernameMode: boolean = false;
  editEmailMode: boolean = false;

  constructor(
    private user: UserService,
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private toast: NgToastService,
    private router: Router,
    private http: HttpClient,
    private dialog: MatDialog){

      this.updateUsernameForm = this.formBuilder.group({
        username: ['', Validators.required]
      });
      this.updateEmailForm = this.formBuilder.group({
        email: ['', Validators.required]
      });

  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0]; // Get the selected file
    const id = this.id;
    console.log(file);
    console.log(id);
    if (file) {
      this.user.uploadProfilePicture(file, id).subscribe(
        response => {
          // Handle successful response
          console.log('Profile picture uploaded successfully:', response);
        },
        error => {
          // Handle error
          console.error('Error uploading profile picture:', error);
        }
      );
    }
  }


  onSubmit(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      this.http.post<any>('api/uploadProfilePicture', formData).subscribe(
        (response) => {
          console.log('File uploaded successfully.', response);
          // Perform any additional actions after successful upload
        },
        (error) => {
          console.error('Error uploading file:', error);
          // Handle error
        }
      );
    }
  }

  // onFileSelected(files: FileList): void {
  //   this.selectedFile = files.item(0);

  // uploadPicture(){

  // }

//   onFileChange(event: any) {
//     const files = event.target.files as FileList;

//     if (files.length > 0) {
//       const _file = URL.createObjectURL(files[0]);
//       this.file = _file;
//       this.resetInput();
//       this.openAvatarEditor(_file)
//       .subscribe(
//         (result: string) => {
//           if(result){
//             this.file = result;
//           }
//         }
//       )
//     }
//  }

//  openAvatarEditor(image: string): Observable<any> {
//   const dialogRef = this.dialog.open(ImageCropperComponent, {
//     maxWidth: '80px',
//     maxHeight: '80px',
//     data: image,

//   });

//   return dialogRef.afterClosed();
// }


//  resetInput(){
//   const input = document.getElementById('profile-picture-input-file') as HTMLInputElement;
//   if(input){
//     input.value = "";
//   }
// }

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
      this.toast.success({detail:"Success", summary:res.message, duration: 3000});
    },
    error:(err)=>{
      console.log(err);
      this.toast.error({detail:"Error", summary:err?.error.message, duration: 3000});
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
      this.email = this.auth.decodedToken().unique_name; //decode new token and get new username from payload
      this.user.setEmail(this.email); //set new username so it can be shown when onInit
      this.toast.success({detail:"Success", summary:res.message, duration: 3000});
    },
    error:(err)=>{
      console.log(err);
      this.toast.error({detail:"Error", summary:err?.error.message, duration: 3000});
      // alert(err?.error.message)
    }
  })
  }




  deleteUser(){
    if(confirm('Are you sure u want to delete your user?'))
    {
    const id = this.auth.decodedToken().id;
    console.log(id);
    this.user.deleteUser(id)
    .subscribe({
      next:(res) => {

        this.toast.success({detail:"Success", summary:res.message, duration: 3000});
        this.auth.signOut();
        this.router.navigate(['login'])
      },
      error:(err)=>{
        console.log(err);
        this.toast.error({detail:"Error", summary:err?.error.message, duration: 3000});

      }
    })
    }


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

    this.user.getUserId().subscribe ( val=> {
      let idFromToken = this.auth.getUserIdFromToken();
      this.id = val || idFromToken;
    })

  }
}

