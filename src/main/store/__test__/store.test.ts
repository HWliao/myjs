import { storeConfigure } from '../stroe';
import { createDependencies } from '../epics';

describe('stroe', () => {
  describe('storeConfigure', () => {
    it('should run without error', () => {
      storeConfigure(createDependencies());
      expect(true).toBeTruthy();
    });
  });
});
