import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertSolutionsComponent } from './expert-solutions.component';

describe('ExpertSolutionsComponent', () => {
  let component: ExpertSolutionsComponent;
  let fixture: ComponentFixture<ExpertSolutionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpertSolutionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpertSolutionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
