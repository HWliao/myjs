import { inject, TestBed } from '@angular/core/testing';

import { LoggerService } from './logger.service';

describe('LoggerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoggerService]
    });
  });

  it('should be created', inject([LoggerService], (service: LoggerService) => {
    expect(service).toBeTruthy();
  }));

  it('should call console.log', inject([LoggerService], (logger: LoggerService) => {
    spyOn(console, 'log');
    const str = 'test';
    logger.log(str);
    expect(console.log).toHaveBeenCalledWith(str);
  }));

  it('should call console.error', inject([LoggerService], (logger: LoggerService) => {
    spyOn(console, 'error');
    const str = 'test';
    logger.error(str);
    expect(console.error).toHaveBeenCalledWith(str);
  }));
});
