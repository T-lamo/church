import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

 

  constructor(
              private authService: AuthService,
              ) { 
              
            }

  ngOnInit() {
    this.authService.SignUp("amosdorceus2010@gmail.com", "Am@$123$");
  }

 
}
