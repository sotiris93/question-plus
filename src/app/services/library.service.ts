import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../pages/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  url: string = 'https://question-plus-7c126-default-rtdb.firebaseio.com/';


  constructor(private http: HttpClient,
     private cookieService: CookieService,
    private authService: AuthService
    ) { }

  getLibraryData(): Observable<User> {
    const isAuthenticated = this.cookieService.get('isAuthenticated') === 'true';
    if (!isAuthenticated) {
      throw new Error('Unauthorized user!');
    }
    return this.http.get<User>(`${this.url}library/${this.authService.username}.json`, {
    });
  }
}