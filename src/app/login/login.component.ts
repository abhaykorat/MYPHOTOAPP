import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signInFormVisible = true;
  email : string = '';
  password : string = '';
  name : string='';

  constructor(private userService: UserService) {}

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

    this.userService.SignIn(this.email,this.password);
    
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

    this.userService.SignUp(this.email,this.password,this.name);
    
    this.email = '';
    this.password = '';
    this.name = '';

  }
 

}
