import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-log-in',
  imports: [FormsModule, RouterModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss',
})
export class LogInComponent implements OnInit {
  isAuthenticated: boolean = false;
  email: string = '';
  password: string = '';

  constructor(
    private authenticationService: AuthenticationService,
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.authenticationService.authState.subscribe((status) => {
      this.isAuthenticated = status;
    });
  }

  login(form: any) {
    console.log('LOGIN METHOD');

    // this.authenticationService.login().subscribe({
    //   next: (response) => {        this.isAuthenticated = response;
    //     console.log('Form data',form.value);
    //     console.log('is authenticated', this.isAuthenticated);
    //   },
    // });
    this.authService
      .login({ email: this.email, password: this.password })
      .subscribe({
        next: (response) => {
          // this.isAuthenticated = response;
          console.log('Form data', form.value);
          console.log('is authenticated', this.isAuthenticated);
          this.router.navigate(['/my-library'], {replaceUrl: true});
        },
      });
  }
}
