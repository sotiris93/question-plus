import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopHandlerComponent } from './pop-handler.component';

describe('PopHandlerComponent', () => {
  let component: PopHandlerComponent;
  let fixture: ComponentFixture<PopHandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopHandlerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
