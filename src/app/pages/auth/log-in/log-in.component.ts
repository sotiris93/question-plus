import { Component, OnInit } from '@angular/core';
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
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.authService.authState.subscribe((status) => {
      this.isAuthenticated = status;
    });
  }

  login() {
    this.authService
      .login({ email: this.email, password: this.password })
      .subscribe({
        next: () => {
          this.router.navigate(['/my-library'], {replaceUrl: true});
        },
      });
  }
}
