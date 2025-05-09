import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './../layout/header/auth/auth.service';
@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  constructor(private http: HttpClient,
     private cookieService: CookieService,
    private authService: AuthService
    ) { }

  getLibraryData(): Observable<User> {
    const isAuthenticated = !!this.cookieService.get('token');
    if (!isAuthenticated) {
      throw new Error('Unauthorized user!');
    }
    return this.http.get<User>(`/library/${this.authService.username}.json`, {
    });
  }
}