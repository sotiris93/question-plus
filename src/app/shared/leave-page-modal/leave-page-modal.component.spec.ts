import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeavePageModalComponent } from './leave-page-modal.component';

describe('LeavePageModalComponent', () => {
  let component: LeavePageModalComponent;
  let fixture: ComponentFixture<LeavePageModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeavePageModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeavePageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
