import { imApiReducer, ImApiStateKeys, initState } from '../reducers';
import { imApiDestroyAction, imApiInitAction } from '../actions';

describe('im api reduers', () => {
  it('should return initstate when default', () => {
    const rState = imApiReducer(initState, {type: 'init_test'});
    expect(rState).toBe(initState);
  });
  it('should return state with inited true when got ImApiInitAction', () => {
    const rState = imApiReducer(initState, imApiInitAction());
    expect(rState.get(ImApiStateKeys.inited)).toBe(true);
  });
  it('should return stae with inited false when got ImApiDestroyAction', () => {
    const rState = imApiReducer(initState, imApiDestroyAction());
    expect(rState.get(ImApiStateKeys.inited)).toBe(false);
  });
});
