import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent implements OnInit{

  registerForm!: FormGroup;

  constructor(private formBuilder: FormBuilder){
    
  }
  
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstname:['', Validators.required],
      lastname:['', Validators.required],
      email:['', Validators.required],
      username:['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmit(): void {
    if(this.registerForm.valid){
      console.log(this.registerForm.value)
    }

    else{
      console.log("form is not valid");
    }
  }

}

