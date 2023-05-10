import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit{
  
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder){
    
  }
  
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username:['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmit(): void {
    if(this.loginForm.valid){
      console.log(this.loginForm.value)
    }

    else{
      console.log("form is not valid");
    }
  }


}
