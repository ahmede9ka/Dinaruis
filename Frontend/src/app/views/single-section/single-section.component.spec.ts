import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleSectionComponent } from './single-section.component';

describe('SingleSectionComponent', () => {
  let component: SingleSectionComponent;
  let fixture: ComponentFixture<SingleSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
