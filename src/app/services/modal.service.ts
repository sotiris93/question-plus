import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalState = new BehaviorSubject<boolean>(false);
  private modalResponse = new Subject<boolean>();
  public modalState$ = this.modalState.asObservable();

  openModal(): Observable<boolean> {
    this.modalState.next(true);
    return this.modalResponse.asObservable();
  }

  closeModal(response: boolean): void {
    this.modalResponse.next(response);
    this.modalState.next(false);
  }
}