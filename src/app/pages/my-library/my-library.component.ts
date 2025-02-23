import { Component, OnInit } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { FlashcardSetsComponent } from './flashcard-sets/flashcard-sets.component';
import { ExpertSolutionsComponent } from './expert-solutions/expert-solutions.component';
import { FoldersComponent } from './folders/folders.component';
import { ClassesComponent } from './classes/classes.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-my-library',
  imports: [TabsModule, FormsModule, CommonModule, RouterModule],
  templateUrl: './my-library.component.html',
  styleUrl: './my-library.component.scss',
})
export class MyLibraryComponent implements OnInit {
  tabs: { title: string; path: string }[] = [
    { title: 'Flashcards', path: 'flashcards' },
    { title: 'Expert Solutions', path: 'expert-solutions' },
    { title: 'Folders', path: 'folders' },
    { title: 'Classes', path: 'classes' },
  ];

  selectedTabIndex: number = 0;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const tabIndex = +this.route.snapshot.queryParams['tabIndex'];
    if (!!this.tabs[tabIndex]) {
      this.selectedTabIndex = tabIndex;
    }
  }
}
