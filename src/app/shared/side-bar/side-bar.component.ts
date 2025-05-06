import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-side-bar',
  imports: [RouterLink],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent implements OnInit{

  sidebarState: boolean = false;
  selectedButton: string = '';
  sidebarService = inject(SidebarService);

  ngOnInit(): void {
    this.sidebarService.sidebarState$.subscribe(state => this.sidebarState = state);
    console.log('sidebar state (BehaviorSubject): ', this.sidebarState);
    console.log('sidebar state (localStorage)', localStorage.getItem('sidebarState'));
  }
}
