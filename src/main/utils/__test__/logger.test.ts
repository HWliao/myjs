import { logger } from '../logger';

describe('logger', () => {
  it('should called console.warn', () => {
    const test = 'test';
    const spy = spyOn(console, 'warn');
    logger.warn(test);
    expect(spy).lastCalledWith(test);
  });
});
