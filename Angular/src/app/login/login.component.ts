import { Component, OnInit } from '@angular/core';
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
  }

  onLogin(){
    if(this.loginForm.valid){

      // Send the object to database
      this.auth.login(this.loginForm.value)
      .subscribe({
        next:(res)=>{
          // alert(res.message)
          this.toast.success({detail:"Success", summary:res.message, duration: 3000});
          this.loginForm.reset();
          this.auth.storeToken(res.token)
          const tokenPayload = this.auth.decodedToken();
          this.user.setUsername(tokenPayload.unique_name);
          this.user.setEmail(tokenPayload.email);
          this.router.navigate(['main'])
        },
        error:()=>{
          this.toast.error({detail:"Error", summary:"Failed to login", duration: 3000});
          // alert(err?.error.message)
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


