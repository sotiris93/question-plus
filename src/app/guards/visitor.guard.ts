import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../pages/auth/auth.service';
import { inject } from '@angular/core';

export const visitorGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  console.log('authstate', authService.authStateValue);
  
  if (authService.authStateValue) {
    router.navigate(['']);
  }
  return !authService.authStateValue;
};
