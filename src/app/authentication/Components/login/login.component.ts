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
  loginginError:string = '';
  constructor(private _AuthService:AuthService , private _Router:Router , private _ProdService:ProdService) { 

  }

  ngOnInit(): void {
  }
  
  loginForm:FormGroup = new FormGroup({
    email: new FormControl(null , [Validators.required , Validators.email]),
    password: new FormControl(null , [Validators.required , Validators.pattern(/^[A-Z][a-z]{2,8}$/)])
  });

  logingin(loginform:FormGroup)
  {
    this._AuthService.login(loginform.value).subscribe(
      (response)=>{
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
    
    this._ProdService.getProducts().subscribe(
      (response)=>{
        localStorage.setItem('products' , JSON.stringify(response));
        this._ProdService.setProducts();
      }
    );
  }

}
