import { Component, HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'app-pop-handler',
  imports: [],
  templateUrl: './pop-handler.component.html',
  styleUrl: './pop-handler.component.scss'
})
export class PopHandlerComponent {

  isPopupVisible: boolean = false;

  constructor(private elRef: ElementRef) {}

  @HostListener('window:click', ['$event'])
  onWindowClick(event: Event) {
    // If the click happened inside this component, ignore it
    if (this.elRef.nativeElement.contains(event.target)) {
      return;
    }
    this.isPopupVisible = false;
  }
}
