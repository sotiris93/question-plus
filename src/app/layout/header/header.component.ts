import {
  Component,
  ElementRef,
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
import { BehaviorSubject, debounceTime, skip, switchMap } from 'rxjs';
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
  isLoggedInSignal = signal(false);

  constructor(
    private popupRecommendationService: PopupRecommendationService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getAuthStatus();
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
}
