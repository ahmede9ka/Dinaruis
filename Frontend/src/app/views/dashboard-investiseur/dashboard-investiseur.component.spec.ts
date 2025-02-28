import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardInvestiseurComponent } from './dashboard-investiseur.component';

describe('DashboardInvestiseurComponent', () => {
  let component: DashboardInvestiseurComponent;
  let fixture: ComponentFixture<DashboardInvestiseurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardInvestiseurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardInvestiseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
