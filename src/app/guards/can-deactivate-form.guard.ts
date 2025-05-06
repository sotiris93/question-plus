import { CanDeactivateFn } from '@angular/router';
import { Observable, take } from 'rxjs';
import { inject } from '@angular/core';
import { ModalService } from '../services/modal.service';

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

export const canDeactivateFormGuard: CanDeactivateFn<CanComponentDeactivate> = (
  component: CanComponentDeactivate,
  currentRoute,
  currentState,
  nextState
) => {
  const modalService = inject(ModalService);
  console.log('canDeactivate called from guard');
  if (!component) {
    console.log('component is not loaded');
  }
  if (component && !component.canDeactivate()) {
    return modalService.openModal();
  }

  return true;
};
