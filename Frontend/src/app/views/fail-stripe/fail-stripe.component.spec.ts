import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FailStripeComponent } from './fail-stripe.component';

describe('FailStripeComponent', () => {
  let component: FailStripeComponent;
  let fixture: ComponentFixture<FailStripeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FailStripeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FailStripeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
