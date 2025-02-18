import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignUpModel } from '../../models/sign-up.model';
import { AuthenticationService } from '../../services/authentication.service';
import { CookieService } from 'ngx-cookie-service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url: string = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService,
    private cookieService: CookieService
  ) {
    // read from/to cookies
  }

  signup(data: SignUpModel) {
    const apiUrl = `${this.url}/signup`;
    return this.http.post(apiUrl, data);
  }

  login(data: { password: string; email: string }) {
    const apiUrl = `${this.url}/login`;
    // return this.http.post(apiUrl, data);

    return this.http
      .post<{ token: string; username: string }>(apiUrl, data)
      .pipe(
        tap((response) => {
          if (response.token) {
            this.authService.login(); // Call login method to update state
            this.cookieService.set('username', response.username);
          }
        })
      );
  }

  get username() {
    return this.cookieService.get('username');
  }
}
