import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm!: FormGroup;
  resetPassForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toast: NgToastService,
    private user: UserService
  ) { }

  ngOnInit(): void{
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })

    this.resetPassForm = this.fb.group({
      email: ['', Validators.required]
    })
  }

  onResetPassword(){

    if(this.resetPassForm.valid){
      const emailToReset = this.resetPassForm.value;
      console.log(this.resetPassForm.value);
      this.auth.sendEmailResetPassword(emailToReset)
    .subscribe({
      next:(res)=> {
      const closeBtnRef = document.getElementById('close-button');
      closeBtnRef?.click();
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
  }

onLogin(){
    if(this.loginForm.valid){
      // Send the object to database
      this.auth.login(this.loginForm.value)
      .subscribe({ 
        next:(res)=>{
          // alert(res.message)
          this.toast.success({
            detail: "Success", summary: res.message, duration: 3000
          });
          this.loginForm.reset();
          this.auth.storeToken(res.token)
          const tokenPayload = this.auth.decodedToken();
          this.user.setUsername(tokenPayload.unique_name);
          this.user.setEmail(tokenPayload.email);
          this.user.setUserId(tokenPayload.id);
          console.log(tokenPayload.id);
          this.user.getPictureUrl(tokenPayload.id).subscribe({
            next: (base64Data:string) => {
              this.user.setProfilePicture('data:image;base64,' + base64Data);
          }})
          this.router.navigate(['main'])
        },
        error:(err)=>{
          this.toast.error({
            detail: "Error", summary: err?.error.message, duration: 3000
          });
        }
      })
    }
    else{
      console.log("Form is invalid")
      //Throw the error using toaster and with required field
      this.validateAllFormFields(this.loginForm);
      alert("Your form is invalid")
    }
    return false;
  }
  private validateAllFormFields(formGroup:FormGroup){
    Object.keys(formGroup.controls).forEach(field=>{
      const control = formGroup.get(field);
      if(control instanceof FormControl){
        control.markAsDirty({onlySelf:true})
      }else if(control instanceof FormGroup){
        this.validateAllFormFields(control)
      }
    })
  }
}


