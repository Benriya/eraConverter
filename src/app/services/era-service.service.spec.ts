import { TestBed } from '@angular/core/testing';

import { EraServiceService } from './era-service.service';

describe('EraServiceService', () => {
  let service: EraServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EraServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
