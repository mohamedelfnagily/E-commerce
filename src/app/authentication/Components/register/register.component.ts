import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl , Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private _AuthService:AuthService , private _Router:Router) { }
  //this variable will carry the registeration error and show it to the user
  registerationError:string = '';
  ngOnInit(): void {
  }
  //here is the registeration form consists of first name , last name , age , password and email
  registerForm:FormGroup = new FormGroup({
    first_name: new FormControl(null , [Validators.required ,  Validators.minLength(5) , Validators.maxLength(15)]),
    last_name: new FormControl(null , [Validators.required ,Validators.minLength(5) , Validators.maxLength(15)]),
    age: new FormControl(null , [Validators.required ,Validators.min(18) , Validators.max(80)]),
    email: new FormControl(null , [Validators.required , Validators.email]),
    password: new FormControl(null , [Validators.required , Validators.pattern(/^[A-Z][a-z]{2,8}$/)]),
  });
  
  //this function is responsible for sending the registeration data and getting the response back
  registeration(registerform:FormGroup)
  {
    this._AuthService.register(registerform.value).subscribe(
      (response)=>{
        if(response.message == 'success')
        {
          this._Router.navigate(['/login']);
        }
        else
        {
          this.registerationError = response.errors.email.message;
        }
      },
      (error)=>{
        this.registerationError = error;
      }
    );
  }

}
