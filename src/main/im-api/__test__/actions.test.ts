import { ImApiActionType, imApiDestroyAction, imApiInitAction } from '../actions';

describe('im api actions', () => {
  describe('imApiInitAction', () => {
    it('should return ImApiInitAction', () => {
      expect(imApiInitAction().type).toBe(ImApiActionType.init);
    });
  });

  describe('imApiDestroyAction', () => {
    it('should return ImApiDestroyAction', () => {
      expect(imApiDestroyAction().type).toBe(ImApiActionType.destroy);
    });
  });
});
