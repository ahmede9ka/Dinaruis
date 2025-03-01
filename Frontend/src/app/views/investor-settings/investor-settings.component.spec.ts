import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestorSettingsComponent } from './investor-settings.component';

describe('InvestorSettingsComponent', () => {
  let component: InvestorSettingsComponent;
  let fixture: ComponentFixture<InvestorSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvestorSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvestorSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
