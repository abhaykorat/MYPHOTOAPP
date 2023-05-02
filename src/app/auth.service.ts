import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private angularFireAuth: AngularFireAuth) {
  }

  /* Sign up */
  SignUp(email: string, password: string) {
    this.angularFireAuth
      .createUserWithEmailAndPassword(email, password)
      .then((res: any) => {
        console.log('Successfully signed up!', res);
      })
      .catch((error: { message: any; }) => {
        console.log('Something is wrong:', error.message);
      });    
  }
  /* Sign in */
  SignIn(email: string, password: string) {
    this.angularFireAuth
      .signInWithEmailAndPassword(email, password)
      .then((res: any) => {
        console.log('Successfully signed in!');
      })
      .catch((error: { message: any; }) => {
        console.log('Something is wrong:',error.message);
      });
  }
  /* Sign out */
  SignOut() {
    this.angularFireAuth
      .signOut();
  }  
}
