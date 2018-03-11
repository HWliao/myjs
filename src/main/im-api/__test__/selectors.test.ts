import { ImApiState, ImApiStateKeys, initState } from '../reducers';
import { RootState, RootStateKeys } from '../../../store/reducers';
import { Map } from 'immutable';
import { selectImApiInited, selectImApiState } from '../selectors';

describe('im api selectors', () => {
  let imApiState: ImApiState = initState;

  let rootState: RootState = Map<RootStateKeys, any>({}).set(RootStateKeys.api, initState);

  describe('selectImApiState', () => {
    it('should return im api state', () => {
      expect(selectImApiState(rootState)).toBe(imApiState);
    });
  });
  describe('selectImApiInited', () => {
    it('should reuturn im api inited', () => {
      expect(selectImApiInited(rootState)).toBe(imApiState.get(ImApiStateKeys.inited));
    });
  });
});
