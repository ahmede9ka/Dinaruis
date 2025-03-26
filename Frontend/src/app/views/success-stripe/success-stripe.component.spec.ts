import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessStripeComponent } from './success-stripe.component';

describe('SuccessStripeComponent', () => {
  let component: SuccessStripeComponent;
  let fixture: ComponentFixture<SuccessStripeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuccessStripeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessStripeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
