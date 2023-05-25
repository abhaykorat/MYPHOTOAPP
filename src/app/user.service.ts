import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import  firebase from 'firebase/compat/app';
import { Observable, map } from 'rxjs';
import { user } from './user';
import { environment } from 'environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { MessageService } from './message.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  defaultProfilePhoto: string ='https://img.freepik.com/premium-vector/avatar-user-icon-vector_97886-15021.jpg?w=740';

  user : Observable<firebase.User | null>;
  userEmail!: string;
  name!: string;
  userName!: string;
  

  constructor(private firebaseAuth: AngularFireAuth,
    private http: HttpClient,
    private router: Router,
    private messageService: MessageService) { 
    this.user = firebaseAuth.authState;
    console.log("User id Token at the construction of the service",localStorage.getItem('userIdToken') );


    this.user.subscribe(
      userInfo => {
        console.log("User info is available", userInfo);
        if(userInfo != null){
          
          this.saveIdToken(userInfo);
        } else {

        }
      }
    );

    this.firebaseAuth.authState.subscribe((user) => {
      if (user) {
        const email = user.email;        // Store the email in the AuthService or any other desired location
        this.setUserEmail(email);

        console.log("Got User Email",this.getUserEmail(),this.getuserName());
      }
    });
  }
  
  
  saveIdToken(firebaseUser : firebase.User){
    firebaseUser.getIdToken().then(
      idTokenValue => {
        localStorage.setItem('userIdToken', idTokenValue);
        console.log("Id Token Value:",localStorage.getItem('userIdToken'));
      }
    );

  }
  

 

  SignIn(email: string, password: string): Promise<any> {
    return this.firebaseAuth.signInWithEmailAndPassword(email, password)
    .then(value => {
            console.log('Successfully signed in!',value);
            if(value.user != null){
              this.saveIdToken(value.user);
         
            }
            this.router.navigate(['profile/me']);
          })
          .catch(err => {
            console.log('Something is wrong:',err.message);
            this.messageService.newMessage(err.message);
          });
  }

  SignUp(email: string, password: string, name: string): Promise<any> {
    return this.firebaseAuth.createUserWithEmailAndPassword(email, password)
    .then(value => {
            console.log('Successfully signed up!', value);
            this.registerUser(email,name);
            if(value.user != null){
              this.setuserName(user.name); 
              this.saveIdToken(value.user);
            }

          })
          .catch(err => {
            console.log('Something is wrong:', err.message);
            this.messageService.newMessage(err.message);
          });
  }
  setuserName(userName: string) {
    console.log(" userName set",userName);
     this.userName = userName;
  }

  getuserName() {
    console.log("from getter userName",this.userName);
    return this.userName;
  }

  registerUser(email: string, name: string){

    var User: user = {
      email: email,
      id: "",
      name: name,
      profilePhotoUrl: this.defaultProfilePhoto
    }
    const idToken = JSON.stringify(this.getHeaders()); // Replace with the actual id token

    const headers = new HttpHeaders().set('idToken', idToken);
    this.http.post(environment.API_BASE_URL + "users/register",User,{ headers })
        .subscribe(response =>{
          console.log('Successfully Registration',response);
          this.router.navigate(['albums/me']);
        });
  }

  logout(): Promise<any> {
    localStorage.clear();
    return this.firebaseAuth.signOut();
  }
  

  public isAuthenticated(): Observable<boolean> {
    return this.firebaseAuth.authState.pipe(map(user => !!user));
  }
  
  setUserEmail(email: string | null): void {
    console.log("User Email Set", this.userEmail);
    this.userEmail = email || '';
  }

  getUserEmail(): string {
    return this.userEmail || '';
  }

  getCurrentUserProfile(){
    var headers = this.getHeaders();
    const emailId = this.getUserEmail();
    console.log("email being Sent to backened :",emailId);
    return this.http.get<any>(environment.API_BASE_URL + "users/getbyemail/" + emailId,this.getHeaders());
  }
 


  getHeaders(): { [header: string]: string | null } {
    const idToken = localStorage.getItem('userIdToken');
    return idToken ? { 'idToken': idToken } : {};
  }
}

function AuthenticatedUser() {
  throw new Error('Function not implemented.');
}

