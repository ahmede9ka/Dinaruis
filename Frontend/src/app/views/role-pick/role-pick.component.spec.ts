import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolePickComponent } from './role-pick.component';

describe('RolePickComponent', () => {
  let component: RolePickComponent;
  let fixture: ComponentFixture<RolePickComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RolePickComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolePickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
