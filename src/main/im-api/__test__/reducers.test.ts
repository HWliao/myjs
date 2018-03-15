import { imApiReducer, ImApiStateKeys, initState } from '../reducers';
import { imApiSetConfigAction } from '../actions';

describe('im api reducers', () => {
  it('should return initState', () => {
    const state = imApiReducer(initState, imApiSetConfigAction({}));
    expect(state.toJS()).toEqual(initState.toJS());
  });
  it('should return state with appKey', () => {
    const state = imApiReducer(initState, imApiSetConfigAction({appKey: 'test'}));
    expect(state.get(ImApiStateKeys.config).get('appKey')).toEqual('test');
  });
});
