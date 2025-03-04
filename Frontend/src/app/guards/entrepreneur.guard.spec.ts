import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { entrepreneurGuard } from './entrepreneur.guard';

describe('entrepreneurGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => entrepreneurGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
