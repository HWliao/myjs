import { TestBed, inject } from '@angular/core/testing';

import { ImApiService } from './im-api.service';

describe('ImApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImApiService]
    });
  });

  it('should be created', inject([ImApiService], (service: ImApiService) => {
    expect(service).toBeTruthy();
  }));
});
