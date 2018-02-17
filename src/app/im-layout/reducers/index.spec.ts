import { getImLayoutShowState, getImLayoutUpState, State } from './index';

const testState = {
  imLayout: {
    show: true,
    up: true
  }
};

fdescribe('im layout selector', () => {
  describe('show selector', () => {
    it('should return show property in state', () => {
      expect(getImLayoutShowState(testState)).toBe(testState.imLayout.show);
    });
  });

  describe('up selector', () => {
    it('should retrun up propery in state', () => {
      expect(getImLayoutUpState(testState)).toBe(testState.imLayout.up);
    });
  });
});
