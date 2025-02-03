import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layout/layout/layout.component').then((m) => m.LayoutComponent),
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () =>
          import('./pages/landing-page/landing-page.component').then(
            (m) => m.LandingPageComponent
          ),
      },
      {
        path: 'terms-of-service', 
        loadComponent: () =>
          import('./pages/terms-of-service/terms-of-service.component').then(
            (m) => m.TermsOfServiceComponent
          ),
      },
      {
        path: 'auth',
        loadComponent: () =>
          import('./pages/auth/authentication.component').then(
            (m) => m.AuthenticationComponent
          ),
      },
    ]
  },
 
  
  
];
