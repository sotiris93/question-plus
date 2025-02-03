import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PopularFlashCards } from '../models/PopularFlashCards.model';
import { PopularTextBooks } from '../models/PopularTextBook.model';
import { PopularQuestion } from '../models/PopularQuestion.model';

@Injectable({
  providedIn: 'root',
})
export class LandingPageService {
  //implement interceptor
  url: string = 'https://question-plus-7c126-default-rtdb.firebaseio.com/';

  constructor(private http: HttpClient) {}

  getPopularFlashCards(): Observable<{[key: string]: PopularFlashCards}> {
    return this.http.get<{[key: string]: PopularFlashCards}>(`${this.url}popular-flashcards.json`);
  }

  getPopularTextbooks(): Observable<{[key: string]:PopularTextBooks}> {
    return this.http.get<{[key: string]: PopularTextBooks}>(`${this.url}popular-textbooks.json`);
  }

  getPopularQuestions(): Observable<{[key: string]: PopularQuestion}> {
    return this.http.get<{[key: string]: PopularQuestion}>(`${this.url}popular-questions.json`);
  }
}