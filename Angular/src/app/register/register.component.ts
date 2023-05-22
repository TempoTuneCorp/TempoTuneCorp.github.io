import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm!: FormGroup;
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) { }

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
          alert(res.message)
          this.registerForm.reset();
          this.router.navigate(['login']);
        },
        error:(err)=>{
          alert(err?.error.message)
        }
      })

    }
    else{
      console.log("Form is invalid")
      //Throw the error using toaster and with required field
    }
    return false;
  }
}