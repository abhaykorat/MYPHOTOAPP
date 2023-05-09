import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import  firebase from 'firebase/compat/app';
import { Observable, map } from 'rxjs';
import { user } from './user';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  defaultProfilePhoto: string ='https://img.freepik.com/premium-vector/avatar-user-icon-vector_97886-15021.jpg?w=740';

 user : Observable<any>;

  constructor(private firebaseAuth: AngularFireAuth,private http: HttpClient,private router: Router) { 
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

  SignUp(email: string, password: string, name: string): Promise<any> {
    return this.firebaseAuth.createUserWithEmailAndPassword(email, password)
    .then((res: any) => {
            console.log('Successfully signed up!', res);
            this.registerUser(email,name);
          })
          .catch((error: { message: any; }) => {
            console.log('Something is wrong:', error.message);
          });
  }

  registerUser(email: string, name: string){

    var User: user = {
      email: email,
      id: "",
      name: name,
      profilePhotoUrl: this.defaultProfilePhoto
    }
    this.http.post(environment.API_BASE_URL + "users/register",User)
        .subscribe(response =>{
          console.log('Successfully Registration',response);
          this.router.navigate(['albums/me']);
        })
  }

  logout(): Promise<any> {
    localStorage.clear();
    return this.firebaseAuth.signOut();
  }
  

  public isAuthenticated(): Observable<boolean> {
    return this.firebaseAuth.authState.pipe(map(user => !!user));
  }
}
