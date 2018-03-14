import { RootState } from '../../../store/reducers';
import { fromJS } from 'immutable';
import { selectLayoutShow, selectLayoutUp } from '../selectors';

describe('im layout selector', () => {

  const mockState = {
    layout: {
      show: false,
      up: false
    }
  };
  let rootState: RootState;

  beforeEach(() => {
    rootState = fromJS(mockState);
  });

  it('the selectLayoutShow should return layout state props show', () => {
    const show = selectLayoutShow(rootState);
    expect(show).toBe(mockState.layout.show);
  });

  it('the selectLayoutUp should return layout state props up', () => {
    const up = selectLayoutUp(rootState);
    expect(up).toBe(mockState.layout.up);
  });
});
