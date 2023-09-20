import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetToken: any;
  updatePasswordForm: FormGroup;
  canUpdatePassword: boolean = false;
  cannotUpdatePassword: boolean = false;

  constructor(private route: ActivatedRoute,private formBuilder: FormBuilder, private auth:AuthService, private toast:NgToastService, private router: Router){
    this.updatePasswordForm = this.formBuilder.group({
      newPassword: ['', Validators.required],
      confirmNewPassword: ['', Validators.required],
    });
  }


  onUpdatePassword(){
    if (this.updatePasswordForm.get('newPassword')?.value === this.updatePasswordForm.get('confirmNewPassword')?.value)
  { 
    const resetToken = this.resetToken;
    const Password = this.updatePasswordForm.get('newPassword')?.value;
    const userObj = {resetToken, Password}
    console.log(userObj);

    this.auth.updatePassword(userObj)
    .subscribe({
      next:(res)=> {
      console.log(res);
      this.toast.success({
        detail: "Success", summary: res.message, duration: 3000 
      });
      this.router.navigate(['login'])
    },
    error:(err)=>{
      console.log(err);
      this.toast.error({
        detail: "Error", summary: err?.error.message, duration: 3000
      });
    }
  })
  }
  else {this.toast.error({
    detail: "Error", summary: "Password doesn't match", duration: 3000
  });}
}

onClick(){
  this.router.navigate(['login'])
}

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.resetToken = params['resetToken'];
    });
    console.log(this.resetToken);

    const resetToken = this.resetToken;
    const userObj = {resetToken};
    this.auth.validateResetToken(userObj)
      .subscribe({
        next:(res)=> {
          this.canUpdatePassword = true;
        this.toast.success({
          detail: "Success", summary: res.message, duration: 3000
        });
      },
      error:(err)=>{
        console.log(err);
        this.cannotUpdatePassword = true;
        this.toast.error({
          detail: "Error", summary: err?.error.message, duration: 3000
        });
      }
    })
  }
}
