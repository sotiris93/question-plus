import { Component } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-log-in',
  imports: [FormsModule, RouterModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export class LogInComponent {

  isAuthenticated: boolean = false;
  email: string = '';
  password: string = '';

  constructor(private authenticationService: AuthenticationService) {}

  login(form: any) {
    console.log('LOGIN METHOD');
    
    this.authenticationService.login().subscribe({
      next: (response) => {        this.isAuthenticated = response;
        console.log('Form data',form.value);
        console.log(this.isAuthenticated);
      },
    });
  }
}
