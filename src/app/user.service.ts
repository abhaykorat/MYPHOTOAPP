import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import  firebase from 'firebase/compat/app';
import { Observable, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

 user : Observable<any>;

  constructor(private firebaseAuth: AngularFireAuth) { 
    this.user = firebaseAuth.authState;
    console.log("User id Token at the construction of the service",localStorage.getItem('userIdToken') );


    this.user.subscribe(
      userInfo => {
        console.log("User info is available", userInfo);
        this.storeIdToken(userInfo.getIdToken());
      }
    );
  }
  storeIdToken(idToken: Promise<string>){
    idToken.then(
      idTokenValue => {
        localStorage.setItem('userIdToken', idTokenValue);
        console.log("Id Token Value:",localStorage.getItem('userIdToken'));
      }
    );

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
    localStorage.clear();
    return this.firebaseAuth.signOut();
  }

  // getIsAuthenticated(): boolean {
  //   return this.isAuthenticated;
  // }

  public isAuthenticated(): Observable<boolean> {
    return this.firebaseAuth.authState.pipe(map(user => !!user));
  }
}
