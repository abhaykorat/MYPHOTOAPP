import { Component } from '@angular/core';
import { AuthService } from './auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn = false;
  constructor(private authService: AuthService) {
    
    this.authService.isAuthenticated().subscribe(authState => {
      this.isLoggedIn = authState;
    });
  }
  title = 'Myphotoapp';
  onLogout() {
    this.authService.logout()
      .then(() => {
        console.log('Successfully signed out!');
      })
      .catch((error) => {
        console.log('Something is wrong:', error.message);
      });
  }
}
