import { Injectable, NgZone } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private firestore: AngularFirestore, private auth : AngularFireAuth, public router: Router,  
    public ngZone: NgZone) { 
      
    }

  SignIn(email :string, password : string) {
    return this.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
         // this.router.navigate(['dashboard']);
        });
       // this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  SignUp(email : string, password : string) {
    return this.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        //this.SendVerificationMail();
        //this.SetUserData(result.user);
      }).catch((error) => {
        console.log("inside it");

        window.alert(error.message)
      })
  }

  

}
