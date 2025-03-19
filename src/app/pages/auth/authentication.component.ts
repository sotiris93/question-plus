import { Component, OnInit } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { LogInComponent } from './log-in/log-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ActivatedRoute, Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { CanComponentDeactivate } from '../../guards/can-deactivate-form.guard';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-authentication',
  imports: [TabsModule, RouterModule],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.scss',
})
export class AuthenticationComponent implements OnInit, CanComponentDeactivate {
  selectedTab: string = '0';

  constructor(private route: ActivatedRoute, private router: Router) {}
  ngOnInit(): void {
    this.selectedTab = this.router.url.includes('auth/log-in') ? '1' : '0';
    console.log('router:', this.router.url);
    console.log('selected tab: ', this.selectedTab);
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    console.log('canDeactivate called');
    return false;
  }
}
