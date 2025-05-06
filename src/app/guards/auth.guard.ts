import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'layout/header/auth/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  console.log('authstate', authService.authStateValue);
  if (authService.authStateValue) {
    return true;
  } else {
    router.navigate(['/auth']);
    return false;
  }
};