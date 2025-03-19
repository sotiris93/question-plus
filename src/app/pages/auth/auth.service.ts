import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { SignUpModel } from '../../models/sign-up.model';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url: string = 'http://localhost:3000';
  
  authState = signal(false);
      
  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) {
    const authStatus = !!this.cookieService.get('token');
    console.log('token value:', this.cookieService.get('token'));
    this.authState.set(authStatus);
  }
 get authStateValue() {
  return this.authState();
 }

  signup(data: SignUpModel) {
    console.log('Sending signup data:', data);
    const apiUrl = `${this.url}/signup`;
    return this.http
    .post<{token: string; username: string}>(apiUrl, data)
    .pipe(
      tap((response) => {
        if (response.token) {
          console.log('response: ', response);
          
          this.authState.set(true);
          this.cookieService.set('token', response.token, {path: '/'});
          this.cookieService.set('username', response.token, {path: '/'});
        }
      }
    ),
    catchError((error) => {
      console.error('Signup failed:', error);
      return of({ error: 'Login failed'});
    }))
  }

  login(data: { password: string; email: string }) {
    const apiUrl = `${this.url}/login`;
    console.log('username', data.password);
    console.log('password', data.email);
    
    return this.http
      .post<{ token: string; username: string }>(apiUrl, data)
      .pipe(
        tap((response) => {
          if (response.token) {
            this.authState.set(true);
            this.cookieService.set('token', response.token, {path: '/'});
            this.cookieService.set('username', response.username, {path: '/'});
          }
        }),
        catchError((error)=> {
          console.error('Login failed:', error);
          return of({ error: 'Login failed'});
        })
      );
  }

  logout() {
    this.authState.set(false);
    this.cookieService.deleteAll('/', window.location.hostname);
    localStorage.clear();
    window.location.reload();
  }

  get username() {
    return this.cookieService.get('username');
  }
}