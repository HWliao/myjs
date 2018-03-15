import { RootState, RootStateKeys } from '../../../store/reducers';
import { fromJS } from 'immutable';
import { selectLayoutShow, selectLayoutUp } from '../selectors';
import { ImLayoutStateKeys } from '../reducers';
import { ImRootStateKeys } from '../../reducers';

describe('im layout selector', () => {

  const mockState = {
    [RootStateKeys.component]: {
      [ImRootStateKeys.layout]: {
        [ImLayoutStateKeys.show]: false,
        [ImLayoutStateKeys.up]: false
      }
    }
  };
  let rootState: RootState;

  beforeEach(() => {
    rootState = fromJS(mockState);
  });

  it('the selectLayoutShow should return layout state props show', () => {
    const show = selectLayoutShow(rootState);
    expect(show).toBe(mockState[RootStateKeys.component][ImRootStateKeys.layout][ImLayoutStateKeys.show]);
  });

  it('the selectLayoutUp should return layout state props up', () => {
    const up = selectLayoutUp(rootState);
    expect(up).toBe(mockState[RootStateKeys.component][ImRootStateKeys.layout][ImLayoutStateKeys.up]);
  });
});
