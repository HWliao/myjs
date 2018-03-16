import { imRootInitedReducer, imRootInitState } from '../reducers';
import { imRootDestroyAction, imRootInitAction } from '../actions';

describe('im root reducers', () => {
  it('should return initState', () => {
    const state = imRootInitedReducer(imRootInitState, {type: 'test'});
    expect(state).toEqual(imRootInitState);
  });
  it('should return true with init action', () => {
    expect(imRootInitedReducer(imRootInitState, imRootInitAction())).toEqual(true);
  });
  it('should return false with destroy action', () => {
    expect(imRootInitedReducer(imRootInitState, imRootDestroyAction())).toEqual(false);
  });
});
