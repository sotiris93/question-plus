import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PopularFlashCards } from '../models/popular-flashcards.model';
import { PopularTextBooks } from '../models/popular-textbook.model';
import { PopularQuestion } from '../models/popular-question.model';

@Injectable({
  providedIn: 'root',
})
export class LandingPageService {

  constructor(private http: HttpClient) {}

  getPopularFlashCards(): Observable<{[key: string]: PopularFlashCards}> {
    return this.http.get<{[key: string]: PopularFlashCards}>(`/popular-flashcards.json`);
  }

  getPopularTextbooks(): Observable<{[key: string]:PopularTextBooks}> {
    return this.http.get<{[key: string]: PopularTextBooks}>(`/popular-textbooks.json`);
  }

  getPopularQuestions(): Observable<{[key: string]: PopularQuestion}> {
    return this.http.get<{[key: string]: PopularQuestion}>(`/popular-questions.json`);
  }
}