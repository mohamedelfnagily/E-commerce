import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl , Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { ProdService } from './../../../Services/prod.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //this variable is used to store any error occurs while logging in like : incorrect p or email
  loginginError:string = '';
  constructor(private _AuthService:AuthService , private _Router:Router , private _ProdService:ProdService) { 

  }

  ngOnInit(): void {
  }
  //login formgroup consists of email and password
  loginForm:FormGroup = new FormGroup({
    email: new FormControl(null , [Validators.required , Validators.email]),
    password: new FormControl(null , [Validators.required , Validators.pattern(/^[A-Z][a-z]{2,8}$/)])
  });

  //this mthod function is:
  //1-checking if the authentication response is success it will add the user token in the local storage
  //2-it will set the user data by passing the data to the behaviour subject
  //3-it will navigate to home page
  //also this function is responsible for the products list caching as per the task requirments that the product should be cached one time at the first time opening the app
  logingin(loginform:FormGroup)
  {
    this._AuthService.login(loginform.value).subscribe(
      (response)=>{
        //authentication request by using the authService
        if(response.message == 'success')
        {
          localStorage.setItem("userToken" , response.token);
          this._AuthService.setUserData();
          this._Router.navigate(['/home']);
        }
        else
        {
          this.loginginError = response.message;
        }
      },
      (error)=>{
        this.loginginError = error;
      }
    );
    //products list request by using prodService
    //here the value is stored in the local storage and passed to the behaviour subject 
    this._ProdService.getProducts().subscribe(
      (response)=>{
        localStorage.setItem('products' , JSON.stringify(response));
        this._ProdService.setProducts();
      }
    );
  }

}
