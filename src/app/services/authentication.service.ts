import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private authSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  authState = this.authSubject.asObservable();

  constructor(private cookieService: CookieService) {
    const authStatus = this.cookieService.get('isAuthenticated') === 'true';
    this.authSubject = new BehaviorSubject<boolean>(authStatus); // Initialize BehaviorSubject with cookie value
  }

  login() {
    this.authSubject.next(true);
    this.cookieService.set('isAuthenticated', 'true', { path: '/', sameSite: 'Lax'}); //Ensures cookie is accessible across the app
    
    // return this.authState.pipe(take(1));
  }

  logout() {
    this.cookieService.set('isAuthenticated', 'false');
    this.authSubject.next(false);
  }

  isAuthenticated(): boolean {
    return this.authSubject.value;
  }

  private getAuthStatus(): boolean {
    return this.cookieService.get('isAuthenticated') === 'true';
  }
}
