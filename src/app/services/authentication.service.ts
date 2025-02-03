import { Injectable } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private authSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  authState = this.authSubject.asObservable();

  constructor() {}

  login() {
    this.authSubject.next(true);
    return this.authState.pipe(take(1));
  }

  logout() {
    this.authSubject.next(false);
  }
}