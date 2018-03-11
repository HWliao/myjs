import { storeConfigure } from '../stroe';

describe('stroe', () => {
  describe('storeConfigure', () => {
    it('should run without error', () => {
      storeConfigure();
      expect(true).toBeTruthy();
    });
  });
});
