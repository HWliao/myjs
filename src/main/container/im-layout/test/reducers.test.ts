import { imLayoutReducer, ImLayoutStateKeys, initState } from '../reducers';
import { BaseAction } from '../../../store/actions';
import { imLayoutDownAction, imLayoutHideAction, imLayoutShowAction, imLayoutUpAction } from '../actions';

describe('im layout reducers', () => {

  describe('init', () => {
    it('should return the initState', () => {
      const nonAction: BaseAction = {
        type: 'test_non'
      };
      const state = imLayoutReducer(initState, nonAction);
      expect(state.equals(initState)).toBeTruthy();
    });
  });

  describe('show action', () => {
    it('should return state with show property true', () => {
      const state = imLayoutReducer(initState, imLayoutShowAction());
      expect(state.get(ImLayoutStateKeys.show)).toBe(true);
    });
  });

  describe('hide action', () => {
    it('should return state with show property false', () => {
      const state = imLayoutReducer(initState, imLayoutHideAction());
      expect(state.get(ImLayoutStateKeys.show)).toBe(false);
    });
  });

  describe('up action', () => {
    it('should return state with up property true', () => {
      const state = imLayoutReducer(initState, imLayoutUpAction());
      expect(state.get(ImLayoutStateKeys.up)).toBe(true);
    });
  });

  describe('down action', () => {
    it('should return state with up property false', () => {
      const state = imLayoutReducer(initState, imLayoutDownAction());
      expect(state.get(ImLayoutStateKeys.up)).toBe(false);
    });
  });
});
