import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { Observable , BehaviorSubject} from 'rxjs';
import { Router } from '@angular/router';
import { ProdService } from './prod.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient:HttpClient , private _Router:Router , private _ProdService:ProdService) { 
    //checking if the local storage contain user token that means that the user didn't log out of the website
    //so when reloading the page this condition checks if the local storage is not empty
    //so the user data will be passed to the behaviour subject
    if(localStorage.getItem("userToken") != null)
    {
      this.setUserData();
    }
  }
  
  //behaviour subject which will be carrying the user data
  userData = new BehaviorSubject(null);
  //method responsible for regestiration request
  register(registerData:object):Observable<any>
  {
    return this._HttpClient.post("https://route-egypt-api.herokuapp.com/signup" , registerData);
  }
   //method responsible for the login request
  login(loginData:object):Observable<any>
  {
    return this._HttpClient.post("https://route-egypt-api.herokuapp.com/signin" , loginData);
  }

  //this method is responsible for retrieving the usertoken from the localstorage and decoding it
  //then passing the decoded token to the behaviour subject
  setUserData()
  {
    let userToken:string = JSON.stringify(localStorage.getItem('userToken'));
    this.userData.next(jwtDecode(userToken));
  }


  //this method is responsible for logging out as it clears the local storage by removing the user token and the product list
  //also it pass null to the behaviour subject carrying the user data and the product list
  //as it navigate the user to the login page
  logOut()
  {
    localStorage.removeItem('userToken');
    localStorage.removeItem('products');
    this.userData.next(null);
    this._ProdService.products.next(null);
    this._Router.navigate(['/login']);
  }
}
