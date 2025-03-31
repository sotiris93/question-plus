import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationStart, Router, RouterOutlet } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { LeavePageModalComponent } from './shared/leave-page-modal/leave-page-modal.component';
import { ModalService } from './services/modal.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    DropdownModule,
    LeavePageModalComponent,
  ],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor() {
    const theme = localStorage.getItem('theme');
    if (theme) {
      document.documentElement.classList.add(theme);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
      if (prefersDark.matches) {
        document.documentElement.classList.add('dark-theme');
      }
      localStorage.setItem('theme', prefersDark.matches ? 'dark' : 'light');
    }
  }
}
