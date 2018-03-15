import { RootState } from '../reducers';
import { fromJS } from 'immutable';
import { selectImRoot, selectMain } from '../selectors';

describe('selectors', () => {
  const state: RootState = fromJS({component: 'component', main: 'main'});
  it('should return component', () => {
    const component = selectImRoot(state);
    expect(component).toEqual('component');
  });
  it('should return main', () => {
    const main = selectMain(state);
    expect(main).toEqual('main');
  });
});
