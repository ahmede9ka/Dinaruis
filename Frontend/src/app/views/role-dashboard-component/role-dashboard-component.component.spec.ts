import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleDashboardComponentComponent } from './role-dashboard-component.component';

describe('RoleDashboardComponentComponent', () => {
  let component: RoleDashboardComponentComponent;
  let fixture: ComponentFixture<RoleDashboardComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoleDashboardComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleDashboardComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
