import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private _AuthService:AuthService) { }
  isLoggedIn:boolean = false;
  userName:any = '';
  ngOnInit(): void {
    this._AuthService.userData.subscribe(
      (response)=>{
        if(this._AuthService.userData.getValue() != null)
        {
          this.userName =  response?.['first_name'];
          this.isLoggedIn = true;
        }
        else
        {
          this.isLoggedIn = false;
        }
      }
    );
  }

  logOutBridge()
  {
    this._AuthService.logOut();
  }

}
