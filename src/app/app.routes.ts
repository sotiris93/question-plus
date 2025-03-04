import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { visitorGuard } from './guards/visitor.guard';
import { canDeactivateFormGuard } from './guards/can-deactivate-form.guard';

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
        canActivate: [visitorGuard],
        loadComponent: () =>
          import('./pages/auth/authentication.component').then(
            (m) => m.AuthenticationComponent
          ),
          children: [
            {
              path: 'sign-up',
              canDeactivate: [() => canDeactivateFormGuard],
              loadComponent: () => import('./pages/auth/sign-up/sign-up.component').then(
                (m) => m.SignUpComponent)
            },
            {
              path: 'log-in', loadComponent: () => import('./pages/auth/log-in/log-in.component').then(
                (m) => m.LogInComponent
              )
            },
            {
              path: '**',
              redirectTo: 'sign-up'
            }
          ]
      },
      {
        path: 'my-library',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./pages/my-library/my-library.component').then(
            (m) => m.MyLibraryComponent
          ),
        children: [
          {
            path: 'flashcards',
            loadComponent: () =>
              import(
                './pages/my-library/flashcard-sets/flashcard-sets.component'
              ).then((m) => m.FlashcardSetsComponent),
          },
          {
            path: 'expert-solutions',
            loadComponent: () =>
              import(
                './pages/my-library/expert-solutions/expert-solutions.component'
              ).then((m) => m.ExpertSolutionsComponent),
          },
          {
            path: 'folders',
            loadComponent: () =>
              import('./pages/my-library/folders/folders.component').then(
                (m) => m.FoldersComponent
              ),
          },
          {
            path: 'classes',
            loadComponent: () =>
              import('./pages/my-library/classes/classes.component').then(
                (m) => m.ClassesComponent
              ),
          },
          {
            path: '**',
            redirectTo: 'flashcards'
          },
        ],
      },
    ],
  },
];
