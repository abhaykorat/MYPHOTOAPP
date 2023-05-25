import { Component } from '@angular/core';
import { UserService } from './user.service';
import { MessageService } from './message.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Myphotoapp';
  isLoggedIn = false;
  constructor(public userService: UserService,public messageService: MessageService) {
    
    this.userService.isAuthenticated().subscribe(authState => {
      this.isLoggedIn = authState;
    });
  }
  clearMessages(){
    this.messageService.clearMessages();
  }
  onLogout() {
    this.userService.logout()
      .then(() => {
        console.log('Successfully signed out!');
      })
      .catch((error) => {
        console.log('Something is wrong:', error.message);
      });
  }
}
