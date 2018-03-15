import { selectImApiConfig } from '../selectors';
import { RootState, RootStateKeys } from '../../store/reducers';
import { fromJS } from 'immutable';
import { ImApiStateKeys } from '../reducers';

describe('im api selectors', () => {
  const stateObj: Object = {
    [RootStateKeys.main]: {
      [ImApiStateKeys.config]: {}
    }
  };
  const state: RootState = fromJS(stateObj);
  it('should return config', () => {
    const config = selectImApiConfig(state);
    expect(config.toJS()).toEqual(stateObj[RootStateKeys.main][ImApiStateKeys.config]);
  });
});
