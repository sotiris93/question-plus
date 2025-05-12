import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { CanComponentDeactivate } from 'guards/can-deactivate-form.guard';
import { Observable } from 'rxjs';
import { LeavePageModalComponent } from "shared/leave-page-modal/leave-page-modal.component";
import { LogInComponent } from "./log-in/log-in.component";
import { SignUpComponent } from "./sign-up/sign-up.component";

@Component({
  selector: 'app-authentication',
  imports: [TabsModule, RouterModule, LogInComponent, SignUpComponent],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.scss',
})
export class AuthenticationComponent implements OnInit, CanComponentDeactivate {
  selectedTab: string = '0';
  isLogin: boolean = true;
  isModalShown: boolean = false;
  @Output() modalVisibilityEmitter = new EventEmitter<boolean>();

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

  closeModal() {
    this.isModalShown = false;
    this.modalVisibilityEmitter.emit(this.isModalShown);
  }
}
