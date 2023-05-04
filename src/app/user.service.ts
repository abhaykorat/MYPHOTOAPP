import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import  firebase from 'firebase/compat/app';
import { Observable, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: Observable<firebase.User>;

  constructor(private firebaseAuth: AngularFireAuth) { 
    this.user = firebaseAuth.authState;
  }

  SignIn(email: string, password: string): Promise<any> {
    return this.firebaseAuth.signInWithEmailAndPassword(email, password)
    .then((res: any) => {
            console.log('Successfully signed in!');
          })
          .catch((error: { message: any; }) => {
            console.log('Something is wrong:',error.message);
          });
  }

  SignUp(email: string, password: string): Promise<any> {
    return this.firebaseAuth.createUserWithEmailAndPassword(email, password)
    .then((res: any) => {
            console.log('Successfully signed up!', res);
          })
          .catch((error: { message: any; }) => {
            console.log('Something is wrong:', error.message);
          });
  }

  logout(): Promise<any> {
    return this.firebaseAuth.signOut();
  }

  // getIsAuthenticated(): boolean {
  //   return this.isAuthenticated;
  // }

  public isAuthenticated(): Observable<boolean> {
    return this.firebaseAuth.authState.pipe(map(user => !!user));
  }
}
