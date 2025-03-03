import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartCampagneStep2Component } from './start-campagne-step2.component';

describe('StartCampagneStep2Component', () => {
  let component: StartCampagneStep2Component;
  let fixture: ComponentFixture<StartCampagneStep2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartCampagneStep2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartCampagneStep2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
