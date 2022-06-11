import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree , Router} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './../Services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _AuthService:AuthService , private _Router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //checking if the value of the userData(behaviour subject) is not null so that means that the user is logged in and can access the url
    //but if the userdata is null that means that the user logged out and no one can access the url
    if(this._AuthService.userData.getValue() != null)
    {
      return true;
    }
    else{
      this._Router.navigate(['/login']);
      return false;
    }
  }
  
}
