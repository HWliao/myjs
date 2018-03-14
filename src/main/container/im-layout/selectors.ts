import { createSelector } from 'reselect';
import { ImLayoutState, ImLayoutStateKeys } from './reducers';
import { selectImLayoutState } from '../selectors';

export const selectLayoutShow = createSelector(
  selectImLayoutState,
  (state: ImLayoutState) => <boolean> state.get(ImLayoutStateKeys.show)
);

export const selectLayoutUp = createSelector(
  selectImLayoutState,
  (state: ImLayoutState) => <boolean> state.get(ImLayoutStateKeys.up)
);
