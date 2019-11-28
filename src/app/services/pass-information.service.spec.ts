import { TestBed } from '@angular/core/testing';

import { PassInformationService } from './pass-information.service';

describe('PassInformationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PassInformationService = TestBed.get(PassInformationService);
    expect(service).toBeTruthy();
  });
});
