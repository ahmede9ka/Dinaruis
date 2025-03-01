import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampagnesManagementComponent } from './campagnes-management.component';

describe('CampagnesManagementComponent', () => {
  let component: CampagnesManagementComponent;
  let fixture: ComponentFixture<CampagnesManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CampagnesManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampagnesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
