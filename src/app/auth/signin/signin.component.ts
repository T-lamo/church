import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.SignIn("amosdorceus2010@gmail.com", "Amo$123$!((^");
    //this.authService.SignOut();
    //this.authService.ForgotPassword("amosdorceus2010@gmail.com");

  }

}
