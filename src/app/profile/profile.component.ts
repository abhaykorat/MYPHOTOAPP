import { Component } from '@angular/core';
import { UserService } from 'app/user.service';
import { user } from '../user'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  title = 'Profile page title';
  profileUrl = 'https://png.pngitem.com/pimgs/s/146-1468432_my-profile-comments-profile-picture-icon-art-hd.png';
  
  viewCount = 0;
  
  name = 'abhay';


  list = ["item 1","item 2","item 3"];

  user1!: user;
constructor(private userService: UserService){}

ngOnInit(): void{
  this.userService.getCurrentUserProfile().subscribe(
    (userProfile: user) =>{
      this.user1 = <user>userProfile;
      console.log("Got User Profile",this.user1);
    }
  )
}
}
