import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { Component, Input, input, TemplateRef } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-carousel',
  imports: [CarouselModule,CommonModule,NgTemplateOutlet],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent {

  @Input({required: true }) title: string = '';
  @Input({required: true }) items: any[] = [];
  @Input({required: true }) contentTemplate: TemplateRef<any> | undefined;

  responsiveOptions = [
    {
      breakpoint: '1170px',
      numVisible: 2,
      numScroll: 2
    },
    {
      breakpoint: '830px',
      numVisible: 1,
      numScroll: 1
    },
  ]
}
