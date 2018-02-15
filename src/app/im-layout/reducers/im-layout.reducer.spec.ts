import { imLayoutShowReducer, imLayoutUpReducer } from './im-layout.reducer';
import {
  ImLayoutDownAction, ImLayoutHideAction, ImLayoutShowAction,
  ImLayoutUpAction
} from '../actions/im-layout.action';

fdescribe('im layout reducers ', () => {
  describe('show reducer', () => {
    it('should return true', () => {
      expect(imLayoutShowReducer(undefined, new ImLayoutShowAction())).toBeTruthy();
    });
    it('should return false', () => {
      expect(imLayoutShowReducer(undefined, new ImLayoutHideAction())).toBeFalsy();
    });
  });
  describe('up reducer', () => {
    it('should return true', () => {
      expect(imLayoutUpReducer(undefined, new ImLayoutUpAction())).toBeTruthy();
    });
    it('should return false', () => {
      expect(imLayoutUpReducer(undefined, new ImLayoutDownAction())).toBeFalsy();
    });
  });
});
