import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SelectModule } from 'primeng/select';
import { TooltipModule } from 'primeng/tooltip';
import { AuthService } from '../auth.service';
import { SignUpModel } from '../../../models/sign-up.model';
import { CanComponentDeactivate } from '../../../guards/can-deactivate-form.guard';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  imports: [
    SelectModule,
    FormsModule,
    CommonModule,
    TooltipModule,
    RouterModule,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent implements OnInit, CanComponentDeactivate {
  selectedMonth!: string;
  selectedDay!: number;
  selectedYear!: number;
  email: string = '';
  username: string = '';
  password: string = '';
  isAuthenticated: boolean = false;
  isReceiveUpdates: boolean = false;
  isAcceptTerms: boolean = false;

  months: string[] = [];
  days: number[] = [];
  years: number[] = [];
  formData: FormData = new FormData();

  constructor(private authService: AuthService) {}
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    console.log('canDeactivate called');
    
    return false;
  }

  initializeFormdata() {
    this.months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    this.days = Array(31)
      .fill(0)
      .map((i, index) => index + 1);

    this.years = Array.from(
      { length: 2026 - 1896 },
      (_, i) => 1896 + i
    ).reverse();
  }

  ngOnInit(): void {
    this.initializeFormdata();
    this.selectedMonth = this.months[0];
    this.selectedDay = this.days[0];
    this.selectedYear = this.years[0];
  }

  signup(form: any) {
    if (form.valid) {
      const data: SignUpModel = {
        email: this.email,
        username: this.username,
        password: this.password,
        dateOfBirth: `${this.selectedYear} ${this.selectedMonth} ${this.selectedDay}`,
      };
      this.isAuthenticated = true;
      this.authService.signup(data).subscribe({
        next: (response) => {
          console.log(response);
          this.isAuthenticated = true;
        },
        error: (error) => {
          console.error(error);
        },
      });
      console.log('Form data', form.value);
    }
  }

  get isFormDirty(): boolean {
    return (
      this.email !== '' ||
      this.username !== '' ||
      this.password !== '' ||
      this.selectedDay !== this.days[0] ||
      this.selectedMonth !== this.months[0] ||
      this.selectedYear !== this.years[0]
    );
  }
}
