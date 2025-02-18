import { Component, OnInit } from '@angular/core';
import { SideBarComponent } from '../../shared/side-bar/side-bar.component';
import { ProfileProgressComponent } from '../profile-progress/profile-progress.component';
import { LandingPageService } from '../../services/landing-page.service';
import { PopularFlashCards } from '../../models/popular-flashcards.model';
import { PopularQuestion } from '../../models/popular-question.model';
import { PopularTextBooks } from '../../models/popular-textbook.model';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from './carousel/carousel.component';

@Component({
  selector: 'app-landing-page',
  imports: [
    SideBarComponent,
    ProfileProgressComponent,
    CarouselModule,
    ButtonModule,
    CommonModule,
    CarouselComponent,
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent implements OnInit {
  popularFlashCards: PopularFlashCards[] = [];
  popularTextBooks: PopularTextBooks[] = [];
  popularQuestions: PopularQuestion[] = [];

  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 3,
    },
  ];

  constructor(private landingPageService: LandingPageService) {}

  ngOnInit(): void {
    this.getPopularFlashCards();
    this.retrievePopularTextBooks();
    this.retrievePopularQuestions();
  }

  getPopularFlashCards() {
    this.landingPageService.getPopularFlashCards().subscribe({
      next: (response: { [key: string]: PopularFlashCards }) => {
        this.popularFlashCards = Object.values(response);
      },
      error: (error) => {
        console.error(
          'An error occurred while retrieving popular flashcards',
          error
        );
      },
    });
  }

  retrievePopularTextBooks() {
    this.landingPageService.getPopularTextbooks().subscribe({
      next: (response: { [key: string]: PopularTextBooks }) => {
        this.popularTextBooks = Object.values(response);
      },
      error: (error) => {
        console.error(
          'An error occurred while retrieving popular textbooks',
          error
        );
      },
    });
  }

  retrievePopularQuestions() {
    this.landingPageService.getPopularQuestions().subscribe({
      next: (response: { [key: string]: PopularQuestion }) => {
        this.popularQuestions = Object.values(response);
        console.log(this.popularQuestions);
      },
      error: (error) => {
        console.error('Error retrieving popular textbooks', error);
      },
    });
  }
}
