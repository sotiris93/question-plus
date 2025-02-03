import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignUpModel } from '../../models/sign-up.model';
import { ThemeUtils } from '@primeng/themes';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {
    // read from/to cookies
  }

  signup(data: SignUpModel) {
    const apiUrl = `${this.url}/signup`;
    return this.http.post(apiUrl, data);
  }

  login(data: { password: string; email: string }) {
    const apiUrl = `${this.url}/login`;
    return this.http.post(apiUrl, data);
  }
}