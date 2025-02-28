import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardEnterpreneurComponent } from './dashboard-enterpreneur.component';

describe('DashboardEnterpreneurComponent', () => {
  let component: DashboardEnterpreneurComponent;
  let fixture: ComponentFixture<DashboardEnterpreneurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardEnterpreneurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardEnterpreneurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
