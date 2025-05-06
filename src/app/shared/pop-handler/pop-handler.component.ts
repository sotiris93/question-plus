import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-pop-handler',
  imports: [],
  templateUrl: './pop-handler.component.html',
  styleUrl: './pop-handler.component.scss'
})
export class PopHandlerComponent {

  isPopupVisible: boolean = false;

  @HostListener('window:click')
  onWindowClick() {
    this.isPopupVisible = false;
  }
}
