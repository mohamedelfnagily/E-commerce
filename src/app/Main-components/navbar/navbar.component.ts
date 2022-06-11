import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private _AuthService:AuthService) { }
  //this boolean variable become true if the user is logged in and false if the user logged out
  isLoggedIn:boolean = false;

  //this variable carries the name of the user which will appear on the profile button
  userName:any = '';
  ngOnInit(): void {
    this._AuthService.userData.subscribe(
      (response)=>{
        //checking on the behaviour subject value if null or not in order to control the appearence of login and logout buttons in the navbar
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

  //this function is responsible for logging out by calling the srvice logout function
  //actions that come with logging out:
  //1-local storage will be empty
  //2-behaviour subject will be null
  //3-user will be navigated to the login page
  logOutBridge()
  {
    this._AuthService.logOut();
  }

}
