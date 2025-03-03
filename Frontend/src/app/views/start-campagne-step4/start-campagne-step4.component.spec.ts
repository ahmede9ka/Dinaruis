import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartCampagneStep4Component } from './start-campagne-step4.component';

describe('StartCampagneStep4Component', () => {
  let component: StartCampagneStep4Component;
  let fixture: ComponentFixture<StartCampagneStep4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartCampagneStep4Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartCampagneStep4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
