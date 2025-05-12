import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
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
import { forkJoin } from 'rxjs';
import { RouterLink } from '@angular/router';
import { FileUploadComponent } from "../../ui/file-upload/file-upload.component";

@Component({
  selector: 'app-landing-page',
  imports: [
    SideBarComponent,
    CarouselModule,
    ButtonModule,
    CommonModule,
    CarouselComponent,
    RouterLink,
    FileUploadComponent
],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent implements OnInit {
  popularFlashCardsTemplate!: TemplateRef<any>;
  popularQuestionsTemplate!: TemplateRef<any>;
  popularTextbooksTemplate!: TemplateRef<any>;

  @ViewChild('popularFlashCardsTemplate', { static: true }) set SetPopularFlashCardsTemplate(template: TemplateRef<any>) {
      this.popularFlashCardsTemplate = template;
      this.carousels[0].template = template;
  }


  @ViewChild('popularTextbooksTemplate', { static: true }) set SetPopularTextbooksTemplate(template: TemplateRef<any>) {
    this.popularTextbooksTemplate = template;
    this.carousels[1].template = template;
  }
  

  @ViewChild('popularQuestionsTemplate', { static: true }) set SetPopularQuestionsTemplate(template: TemplateRef<any>) {
    this.popularQuestionsTemplate = template;
    this.carousels[2].template = template;
  }
  

  carousels: {
    title: string;
    items: (PopularFlashCards | PopularTextBooks | PopularQuestion | { loading: true })[];
    template: TemplateRef<any>;
    isLoaded: boolean;
  }[] = [
    {
      title: 'Popular Flashcards',
      items: Array(3).fill({ loading: true }),
      template: this.popularFlashCardsTemplate,
      isLoaded: false,
    },
    {
      title: 'Popular Textbooks',
      items: Array(3).fill({ loading: true }),
      template: this.popularTextbooksTemplate,
      isLoaded: false,
    },
    {
      title: 'Popular Questions',
      items: Array(3).fill({ loading: true }),
      template: this.popularQuestionsTemplate,
      isLoaded: false,
    },
  ];

  constructor(private landingPageService: LandingPageService) {}
  ngOnInit(): void {
      this.loadData();
  }

  loadData() {
    forkJoin([
      this.landingPageService.getPopularFlashCards(),
      this.landingPageService.getPopularTextbooks(),
      this.landingPageService.getPopularQuestions(),
    ]).subscribe({
      next: ([flashcardsResponse, textBookresponse, questionsResponse]) => {
        this.carousels[0].items = Object.values(flashcardsResponse);
        this.carousels[0].isLoaded = true;
        this.carousels[1].items = Object.values(textBookresponse);
        this.carousels[1].isLoaded = true;
        this.carousels[2].items = Object.values(questionsResponse);
        this.carousels[2].isLoaded = true;
        // this.carousels[0] = {
        //   title: 'Popular Flashcards',
        //   items: Object.values(flashcardsResponse),
        //   template: this.popularFlashCardsTemplate,
        //   isLoaded: true,
        // };
        // this.carousels[1] = {
        //   title: 'Popular Textbooks',
        //   items: Object.values(textBookresponse),
        //   template: this.popularTextbooksTemplate,
        //   isLoaded: true,
        // };
        // this.carousels[2] = {
        //   title: 'Popular Questions',
        //   items: Object.values(questionsResponse),
        //   template: this.popularQuestionsTemplate,
        //   isLoaded: true,
        // };
      },
      error: (error) => {
        console.error('Error while retrieving the data', error);
      },
    });
  }
  
}