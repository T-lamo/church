import { Injectable, NgZone } from '@angular/core';
import { AngularFirestore ,AngularFirestoreDocument} from '@angular/fire/firestore';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { User } from "../shared/services/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any; 

  constructor(private firestore: AngularFirestore, private fauth : AngularFireAuth, public router: Router,  
    public ngZone: NgZone) { 
      this.fauth.authState.subscribe(user => {
        if (user) {
          this.userData = user;
          localStorage.setItem('user', JSON.stringify(this.userData));
          console.log(localStorage.getItem('user'));
          JSON.parse(localStorage.getItem('user') || '{}');
        } else {
          localStorage.setItem('user','{}');
          JSON.parse(localStorage.getItem('user')|| '{}');
        }
      });
    }

  SignIn(email :string, password : string) {
    return this.fauth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['members']);
         //console.log(localStorage.getItem('user'));
         let data = JSON.parse(localStorage.getItem("user") || '{}');
         console.log(data);
         console.log(data.emailVerified);
        });
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  SignUp(email : string, password : string) {
    return this.fauth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        this.SendVerificationMail();
        this.SetUserData(result.user);
      }).catch((error) => {
        console.log("inside it");

        window.alert(error.message)
      })
  }
  SetUserData(user : any) {
    const userRef: AngularFirestoreDocument<any> = this.firestore.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.fauth.currentUser.then(u=> {
      if(u!=null){
        u.sendEmailVerification()
      }
    })
    .then(() => {
      this.router.navigate(['members']);
    })
  }
  
   // Reset Forggot password
   ForgotPassword(passwordResetEmail : any) {
    return this.fauth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Password reset email sent, check your inbox.');
    }).catch((error) => {
      window.alert(error)
    })
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  // Sign in with Google
  GoogleAuth() {
    //return this.AuthLogin(new auth.GoogleAuthProvider());
  }
  // Auth logic to run auth providers
  AuthLogin(provider :any) {
    return this.fauth.signInWithPopup(provider)
    .then((result) => {
       this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        })
      this.SetUserData(result.user);
    }).catch((error) => {
      window.alert(error)
    })
  }

   // Sign out 
   SignOut() {
    return this.fauth.signOut().then(() => {
      localStorage.removeItem('user');
      console.log(localStorage.getItem('user'));
      //this.router.navigate(['members']);
    })
  }

}
