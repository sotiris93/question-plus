import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { ProgressSpinner } from 'primeng/progressspinner';
import {  finalize, take } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-log-in',
  imports: [FormsModule, RouterModule, ProgressSpinner, CommonModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss',
})
export class LogInComponent implements OnInit {
  isAuthenticated: boolean = false;
  isRequestSent: boolean = false;
  email: string = '';
  password: string = '';
  showPassword: boolean = false;
  @Output() closeModalEmitter: EventEmitter<boolean> = new EventEmitter(false);

  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    // this.authService.authState.subscribe((status) => {
    //   this.isAuthenticated = status;
    // });
    this.isAuthenticated =this.authService.authState();
  }

  login() {
    this.isRequestSent = true;
    this.authService
      .login({ email: this.email, password: this.password })
      .pipe(
        finalize(() => {
          this.isRequestSent = false
        })
      )
      .subscribe({
        next: () => {
          console.log('Login successful');
          this.router.navigate(['/my-library'], { replaceUrl: true });
          this.closeModalEmitter.emit(true);
        },
        error: (error) => {
          console.error('Error logging in:', error);
        },
      });
  }
}