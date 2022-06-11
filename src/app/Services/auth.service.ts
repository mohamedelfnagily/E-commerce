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
    if(localStorage.getItem("userToken") != null)
    {
      this.setUserData();
    }
  }
  
  userData = new BehaviorSubject(null);
  register(registerData:object):Observable<any>
  {
    return this._HttpClient.post("https://route-egypt-api.herokuapp.com/signup" , registerData);
  }

  login(loginData:object):Observable<any>
  {
    return this._HttpClient.post("https://route-egypt-api.herokuapp.com/signin" , loginData);
  }

  setUserData()
  {
    let userToken:string = JSON.stringify(localStorage.getItem('userToken'));
    this.userData.next(jwtDecode(userToken));
  }

  logOut()
  {
    localStorage.removeItem('userToken');
    localStorage.removeItem('products');
    this.userData.next(null);
    this._ProdService.products.next(null);
    this._Router.navigate(['/login']);
  }
}
