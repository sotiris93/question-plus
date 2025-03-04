import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignUpModel } from '../../models/sign-up.model';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url: string = 'http://localhost:3000';
  private authSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );


  authState = this.authSubject.asObservable();
      
  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) {
    const authStatus = !!this.cookieService.get('token');
    this.authSubject.next(authStatus);
  }
 get authStateValue() {
  console.log('authStateValue', this.authSubject.value);
  return this.authSubject.value;
 }

  signup(data: SignUpModel) {
    const apiUrl = `${this.url}/signup`;
    return this.http.post(apiUrl, data);
  }

  login(data: { password: string; email: string }) {
    const apiUrl = `${this.url}/login`;

    return this.http
      .post<{ token: string; username: string }>(apiUrl, data)
      .pipe(
        tap((response) => {
          if (response.token) {
            this.authSubject.next(true);  
            this.cookieService.set('token', response.token);
            this.cookieService.set('username', response.username);
          }
        }),
        catchError((error)=> {
          console.error('Login failed:', error);
          return of({ error: 'Login failed'});
        })
      );
  }

  logout() {
    this.authSubject.next(false);
    this.cookieService.deleteAll('/', window.location.hostname);
    localStorage.clear();
    window.location.reload();
  }

  get username() {
    return this.cookieService.get('username');
  }
}
