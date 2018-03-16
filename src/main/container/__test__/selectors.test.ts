import { selectImLayoutState, selectImRootInited } from '../selectors';
import { ImRootStateKeys } from '../reducers';
import { RootState, RootStateKeys } from '../../store/reducers';
import { fromJS } from 'immutable';

describe('im root selectors', () => {
  const stateObj = {
    [RootStateKeys.component]: {
      [ImRootStateKeys.inited]: false,
      [ImRootStateKeys.layout]: 'test'
    }
  };

  const state: RootState = fromJS(stateObj);

  it('should return inited with selectImRootInited', () => {
    expect(selectImRootInited(state)).toEqual(stateObj[RootStateKeys.component][ImRootStateKeys.inited]);
  });

  it('should return layout with selectImLayoutState', () => {
    expect(selectImLayoutState(state)).toEqual(stateObj[RootStateKeys.component][ImRootStateKeys.layout]);
  });
});
