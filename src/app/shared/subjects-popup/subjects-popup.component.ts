import { Component, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-subjects-popup',
  imports: [],
  templateUrl: './subjects-popup.component.html',
  styleUrl: './subjects-popup.component.scss'
})
export class SubjectsPopupComponent {

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
