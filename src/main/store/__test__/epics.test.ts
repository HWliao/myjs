import { createRootEpic } from '../epics';

describe('epics', () => {
  it('should not be crash', () => {
    try {
      createRootEpic();
      expect(true).toBeTruthy();
    } catch (e) {
      expect(false).toBeTruthy();
    }
  });
});
