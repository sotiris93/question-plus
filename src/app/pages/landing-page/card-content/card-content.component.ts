import { Component, Input } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-card-content',
  standalone: true,
  imports: [CarouselModule, ButtonModule],
  templateUrl: './card-content.component.html',
  styleUrls: ['./card-content.component.scss'],
})
export class CardContentComponent {
  @Input() title: string = '';
  @Input() items: any[] = [];
  @Input() numVisible: number = 3;
  @Input() numScroll: number = 3;
  @Input() responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 3,
    },
  ];
}
