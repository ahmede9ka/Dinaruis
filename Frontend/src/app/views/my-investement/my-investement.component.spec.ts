import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyInvestementComponent } from './my-investement.component';

describe('MyInvestementComponent', () => {
  let component: MyInvestementComponent;
  let fixture: ComponentFixture<MyInvestementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyInvestementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyInvestementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
