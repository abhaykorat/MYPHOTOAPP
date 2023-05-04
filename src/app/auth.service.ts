// import { Injectable } from '@angular/core';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
// import { FirebaseAuth } from 'angularfire2';
// import { Observable, map } from 'rxjs';
// import * as firebase from 'firebase/compat/app'

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
 
//   constructor(private angularFireAuth: AngularFireAuth) {
//     this.angularFireAuth.authState.subscribe(user => {
//     });
//   }
  
//   SignIn(email: string, password: string): Promise<any> {
//     return this.angularFireAuth.signInWithEmailAndPassword(email, password)
//     .then((res: any) => {
//             console.log('Successfully signed in!');
//           })
//           .catch((error: { message: any; }) => {
//             console.log('Something is wrong:',error.message);
//           });
//   }

//   SignUp(email: string, password: string): Promise<any> {
//     return this.angularFireAuth.createUserWithEmailAndPassword(email, password)
//     .then((res: any) => {
//             console.log('Successfully signed up!', res);
//           })
//           .catch((error: { message: any; }) => {
//             console.log('Something is wrong:', error.message);
//           });
//   }

//   logout(): Promise<any> {
//     return this.angularFireAuth.signOut();
//   }

//   // getIsAuthenticated(): boolean {
//   //   return this.isAuthenticated;
//   // }

//   public isAuthenticated(): Observable<boolean> {
//     return this.angularFireAuth.authState.pipe(map(user => !!user));
//   }
// }


