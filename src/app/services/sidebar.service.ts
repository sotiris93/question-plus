import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private initialState: boolean = JSON.parse(localStorage.getItem('sidebarState') ?? 'false');
  private sidebarStateSubject = new BehaviorSubject<boolean>(this.initialState);
  sidebarState$ = this.sidebarStateSubject.asObservable();

  toggleSidebar() {
    let state = !this.sidebarStateSubject.getValue();
    localStorage.setItem('sidebarState', JSON.stringify(state));
    this.sidebarStateSubject.next(state);
  }
}