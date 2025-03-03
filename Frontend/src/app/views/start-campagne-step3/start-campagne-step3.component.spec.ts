import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartCampagneStep3Component } from './start-campagne-step3.component';

describe('StartCampagneStep3Component', () => {
  let component: StartCampagneStep3Component;
  let fixture: ComponentFixture<StartCampagneStep3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartCampagneStep3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartCampagneStep3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
