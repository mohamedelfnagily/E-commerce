import { Component, OnInit } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userData:any = {};
  constructor(private _AuthService:AuthService) { }

  ngOnInit(): void {
    let userToken = JSON.stringify(localStorage.getItem('userToken'));
    this.userData = jwtDecode(userToken);
  }

}
