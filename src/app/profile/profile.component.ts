import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  title = 'Profile page title';
  profileUrl = 'https://img.freepik.com/premium-vector/avatar-user-icon-vector_97886-15021.jpg?w=740';
  
  viewCount = 0;
  
  name = 'abhay';


  list = ["item 1","item 2","item 3"];

constructor(){}

ngOnInit(): void{

}
  incrementCount(){
    this.viewCount++;
  }

}
