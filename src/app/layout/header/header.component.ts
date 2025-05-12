import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  OnInit,
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
import { RouterModule, Router } from '@angular/router';
import { SidebarService } from '../../services/sidebar.service';
import { PopHandlerComponent } from "../../shared/pop-handler/pop-handler.component";
import { AuthenticationComponent } from "./auth/authentication.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, ButtonModule, SelectModule, RouterModule, PopHandlerComponent, AuthenticationComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  selectedCity: string | undefined;
  isPopupOpen: boolean = false;
  isFilterPopupOpen: boolean = false;
  @ViewChild('inputText') inputText: ElementRef | undefined;
  @ViewChild('middleSection') middleSection!: ElementRef;
  private searchSubject = new BehaviorSubject<string>("");
  recommendedWords: string[] = [];
  isLoggedInSignal = signal(false);
  userSearchesSubject = new Subject<string>();
  hasSearched: boolean = false;
  isSidebarOpen: boolean = true;
  isAuthenticationModalShown: boolean = false;
  authService = inject(AuthService);
  popupRecommendationService = inject(PopupRecommendationService);
  sidebarService = inject(SidebarService);

  ngOnInit(): void {
    this.getAuthStatus();
    this.getRecommendation();
    this.sidebarService.sidebarState$.subscribe(state => this.isSidebarOpen = state);

    this.userSearchesSubject.pipe(take(1)).subscribe(()=> {
      this.hasSearched = true;

      setTimeout(()=> {
       this.hasSearched = false;
      }, 3000)
    })
  }

  @HostListener('document:click')
  onDocumentClick() {
    this.isPopupOpen = false;
    this.isFilterPopupOpen = false;
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchSubject.next(input.value);
    this.userSearchesSubject.next(input.value);
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

  getAuthStatus() {
    this.isLoggedInSignal = this.authService.authState;
  }

  toggleSidebar(): void {
    console.log('isSidebarOpen called')
    this.isSidebarOpen = !this.isSidebarOpen;
    this.sidebarService.changeState(this.isSidebarOpen);
  }
}