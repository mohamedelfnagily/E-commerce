import { Component, OnInit } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  //this variable carries the user data after decoding the token
  userData:any = {};
  constructor(private _AuthService:AuthService) { }

  ngOnInit(): void {
    //retrieving the user token in order to decode it and get te user data
    let userToken = JSON.stringify(localStorage.getItem('userToken'));
    this.userData = jwtDecode(userToken);
  }

}
