import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartCampagneComponent } from './start-campagne.component';

describe('StartCampagneComponent', () => {
  let component: StartCampagneComponent;
  let fixture: ComponentFixture<StartCampagneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartCampagneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartCampagneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
