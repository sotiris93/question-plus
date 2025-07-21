import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  OnInit,
  Renderer2,
  signal,
  ViewChild,
} from '@angular/core';
import { SelectItemGroup } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { BehaviorSubject, debounceTime, skip, Subject, switchMap, take } from 'rxjs';
import { PopupRecommendationService } from '../../services/popup-recommendation.service';
import { AuthService } from 'layout/header/auth/auth.service';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { SidebarService } from '../../services/sidebar.service';
import { PopHandlerComponent } from "../../shared/pop-handler/pop-handler.component";
import { AuthenticationComponent } from "./auth/authentication.component";
import { AutofocusDirective } from 'directives/autofocus.directive';
import { CommonModule } from '@angular/common';
import { SubjectsPopupComponent } from "../../shared/subjects-popup/subjects-popup.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, ButtonModule, SelectModule, RouterModule, PopHandlerComponent, AuthenticationComponent, AutofocusDirective, CommonModule, SubjectsPopupComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, AfterViewInit {
  ngAfterViewInit(): void {
    this.onResize()
  }
  isPopupOpen: boolean = false;
  isFilterPopupOpen: boolean = false;
  @ViewChild('inputText') inputText: ElementRef | undefined;
  @ViewChild('mainLogo') mainLogo!: ElementRef;
  @ViewChild('secondaryLogo') secondaryLogo!: ElementRef;
  private searchSubject = new BehaviorSubject<string>("");
  recommendedWords: string[] = [];
  isLoggedInSignal = signal(false);
  userSearchesSubject = new Subject<string>();
  hasSearched: boolean = false;
  isAuthenticationModalShown: boolean = false;
  authService = inject(AuthService);
  popupRecommendationService = inject(PopupRecommendationService);
  sidebarService = inject(SidebarService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  renderer2 = inject(Renderer2);
  example: string = '';
  currentWindowWidth!: number;

  ngOnInit(): void {
    this.currentWindowWidth = window.innerWidth;
    this.isLoggedInSignal = this.authService.authState;
    this.getRecommendation();
  }

  @HostListener('document:click')
  onDocumentClick() {
    this.isPopupOpen = false;
    this.isFilterPopupOpen = false;
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchSubject.next(input.value);
  }

  getRecommendation() {
    this.searchSubject
      .pipe(
        skip(1),
        debounceTime(300),
        switchMap((searchTerm) => {
          console.log('search input changed', searchTerm);
          return this.popupRecommendationService.getWords(searchTerm)
        }
        )
      )
      .subscribe({
        next: (response) => {
          this.recommendedWords = response;
          console.log(this.recommendedWords);
        },
        error: (error) => {
          console.error('Error fetching recommended words:', error);
        },
      });
  }

  logout() {
    this.authService.logout();
  }

  toggleSidebar(): void {
    console.log('isSidebarOpen called')
    this.sidebarService.toggleSidebar();
  }

  @HostListener('window:resize')
  onResize() {
    const width = window.innerWidth;
    if(width > 960 && !this.isLoggedInSignal()) {
      this.renderer2.setStyle(this.mainLogo.nativeElement, 'display', 'flex');
      this.renderer2.removeStyle(this.secondaryLogo.nativeElement, 'display')
    } else if (width < 960 && !this.isLoggedInSignal()) {
      this.renderer2.setStyle(this.secondaryLogo.nativeElement, 'display', 'flex');
      this.renderer2.removeStyle(this.mainLogo.nativeElement, 'display');
    } else if (this.isLoggedInSignal()) {
      this.renderer2.setStyle(this.secondaryLogo.nativeElement, 'display', 'flex');
      this.renderer2.removeStyle(this.mainLogo.nativeElement, 'display');
    }
  }
}