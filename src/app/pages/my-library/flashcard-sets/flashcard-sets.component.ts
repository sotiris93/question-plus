import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { LibraryService } from '../../../services/library.service';
import { User } from '../../../models/user.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-flashcard-sets',
  imports: [CommonModule],
  templateUrl: './flashcard-sets.component.html',
  styleUrl: './flashcard-sets.component.scss',
})
export class FlashcardSetsComponent implements OnInit {
  categories: string[] = ['created', 'recent', 'studied'];
  selectedCategory = this.categories[1];
  isDropdownOpen: boolean = false;
  userLibraryData: User | null = { created: [], recent: [], studied: [] }; // MOCK OBJECT;
  isAuthenticated: boolean = false;

  constructor(
    private libraryService: LibraryService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getUserLibraryData();
  }

  @HostListener('document:click')
  onDocumentClick() {
    this.isDropdownOpen = false;
  }

  getUserLibraryData() {
    this.libraryService.getLibraryData().subscribe({
      next: (data) => {
        if (data) {
          this.userLibraryData = data;
          console.log('User data: ', data);
        }
      },
      error: (err) => {
        console.error('Error fetching library data:', err);
        if (err.status === 401) {
          console.warn('Unauthorized request - redirecting to login');
          this.router.navigate(['/login']);
        }
      },
    });
  }
}
