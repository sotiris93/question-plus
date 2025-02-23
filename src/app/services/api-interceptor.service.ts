import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../pages/auth/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const baseUrl = 'https://question-plus-7c126-default-rtdb.firebaseio.com';
  const authService = inject(AuthService);
  const router = inject(Router);
  console.log('request', req);
  let authReq = req;
  
  if (!req.url.startsWith('http')) {
    authReq = req.clone({
      url: baseUrl + req.url,
    });
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse): Observable<any> => {
      if (error.status === 401) {
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};
