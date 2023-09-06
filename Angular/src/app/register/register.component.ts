import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm!: FormGroup;
  constructor(
    private fb: FormBuilder, 
    private auth: AuthService, 
    private router: Router,
    private toast: NgToastService
    ) { }

  ngOnInit(): void{
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required]
    })
  }

  onRegister(){
    if(this.registerForm.valid){
      console.log(this.registerForm.value)
      // Send the object to database
      this.auth.signUp(this.registerForm.value)
      .subscribe({
        next:(res)=>{
          this.toast.success({
            detail: "Success", summary: "User created", duration: 5000
          });
          this.registerForm.reset();
          this.router.navigate(['login']);
        },
        error:(err)=>{
          this.toast.error({detail:"Error", summary: err?.error.message, duration: 5000});
        }
      })
    }
    return false;
  }
}