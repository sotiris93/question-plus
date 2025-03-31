import {
  Component,
  ElementRef,
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
import { BehaviorSubject, debounceTime, Subject, switchMap } from 'rxjs';
import { PopupRecommendationService } from '../../services/popup-recommendation.service';
import { AuthService } from '../../pages/auth/auth.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, ButtonModule, SelectModule, RouterModule],
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
  authService = inject(AuthService);
  isLoggedIn!: boolean;
  isLoggedInSignal = signal(false);

  constructor(
    private popupRecommendationService: PopupRecommendationService,
    private router: Router,
    private renderer2: Renderer2
  ) {}

  ngOnInit(): void {
    this.getAuthStatus();
    console.log('auth status: ', this.isLoggedIn);
    this.getRecommendation();
  }

  @HostListener('document:click')
  onDocumentClick() {
    console.log(this.isPopupOpen);
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
        debounceTime(300),
        switchMap((searchTerm) =>
          this.popupRecommendationService.getWords(searchTerm)
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
    this.isLoggedIn = false;
    this.router.navigate(['']);
    console.log('logout called');
  }

  getAuthStatus() {
    // this.authService.authState.subscribe((loginStatus) => {
    //   this.isLoggedIn = loginStatus;
    //   console.log('login status', this.isLoggedIn);
    // });
    this.isLoggedIn = this.authService.authState();
    this.isLoggedInSignal.set(this.authService.authState());
  }
}
