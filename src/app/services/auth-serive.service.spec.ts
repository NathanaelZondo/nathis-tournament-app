import { TestBed } from '@angular/core/testing';

import { AuthSeriveService } from './auth-serive.service';

describe('AuthSeriveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthSeriveService = TestBed.get(AuthSeriveService);
    expect(service).toBeTruthy();
  });
});
