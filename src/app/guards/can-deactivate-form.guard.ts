import { CanDeactivateFn } from '@angular/router';
import { Observable } from 'rxjs';
import { SignUpComponent } from '../pages/auth/sign-up/sign-up.component';

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

export const canDeactivateFormGuard: CanDeactivateFn<CanComponentDeactivate> = (
  component: CanComponentDeactivate,
  currentRoute,
  currentState,
  nextState
) => {
  console.log('canDeactivate called from guard');
  if (!component) {
    console.log('component is not loaded');
  }
  if (component && !component.canDeactivate()) {
    const confirmExit = confirm('You have unsaved changes. Do you really want to leave?');
    return confirmExit; 
  }
  return true;
};