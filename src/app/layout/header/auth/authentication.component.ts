import { Component, EventEmitter, HostListener, inject, OnInit, Output, Renderer2 } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import {  Router, RouterModule, RouterOutlet } from '@angular/router';
import { CanComponentDeactivate } from 'guards/can-deactivate-form.guard';
import { Observable } from 'rxjs';
import { LeavePageModalComponent } from "shared/leave-page-modal/leave-page-modal.component";
import { LogInComponent } from "./log-in/log-in.component";
import { SignUpComponent } from "./sign-up/sign-up.component";

@Component({
  selector: 'app-authentication',
  imports: [TabsModule, LogInComponent, SignUpComponent],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.scss',
})
export class AuthenticationComponent implements OnInit, CanComponentDeactivate {
  selectedTab: string = '0';
  isLogin: boolean = true;
  isModalShown: boolean = false;
  @Output() modalVisibilityEmitter = new EventEmitter<boolean>();
  renderer2 = inject(Renderer2);

  ngOnInit(): void {
    // this.selectedTab = this.router.url.includes('auth/log-in') ? '0' : '1';
    console.log('selected tab: ', this.selectedTab);
    this.renderer2.setStyle(document.body, 'overflow', 'hidden');
    this.renderer2.addClass(document.body, 'overflow-y-hidden');
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    console.log('canDeactivate called');
    return false;
  }


  closeModal() {
    this.isModalShown = false;
    this.modalVisibilityEmitter.emit(this.isModalShown);
    this.renderer2.removeClass(document.body, 'overflow-y-hidden')
  }

  @HostListener('window:resize')
  onWindowResize() {
    if (window.innerWidth >= 768) {
      this.renderer2.removeStyle(document.body, 'overflow');
    }
  }




  ngOnDestroy(): void {
    this.renderer2.removeClass(document.body, 'overflow-y-hidden')
  }
}
