import { TestBed, inject } from '@angular/core/testing';

import { ImDocService } from './im-doc.service';

describe('ImDocService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImDocService]
    });
  });

  it('should be created', inject([ImDocService], (service: ImDocService) => {
    expect(service).toBeTruthy();
  }));
});
