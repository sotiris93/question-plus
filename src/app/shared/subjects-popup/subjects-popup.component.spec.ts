import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectsPopupComponent } from './subjects-popup.component';

describe('SubjectsPopupComponent', () => {
  let component: SubjectsPopupComponent;
  let fixture: ComponentFixture<SubjectsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubjectsPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubjectsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
