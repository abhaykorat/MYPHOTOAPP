import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signInFormVisible = true;
  email : string = '';
  password : string = '';


  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    
  }

  signUpForm(){
    

  }

  makeSignInFormVisible(){
    this.signInFormVisible = true;
    
  }

  makeSignUpFormVisible(){
    this.signInFormVisible = false;
    
  }


  login(){
    console.log("User Tried to Login");
    if(this.email == '') {
      alert('Please enter email');
      return;
    }

    if(this.password == '') {
      alert('Please enter password');
      return;
    }

    this.authService.SignIn(this.email,this.password);
    
    this.email = '';
    this.password = '';

  }

  signup(){
    console.log("User Tried to SignUp");
    if(this.email == '') {
      alert('Please enter email');
      return;
    }

    if(this.password == '') {
      alert('Please enter password');
      return;
    }

    this.authService.SignUp(this.email,this.password);
    
    this.email = '';
    this.password = '';

  }
 

}
