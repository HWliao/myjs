import { createSelector } from 'reselect';
import { ImLayoutState, ImLayoutStateKeys } from './reducers';
import { RootState, RootStateKeys } from '../../store/reducers';

export const selectLayout = (state: RootState) => state.get(RootStateKeys.layout);

export const selectLayoutShow = createSelector(
  selectLayout,
  (state: ImLayoutState) => state.get(ImLayoutStateKeys.show)
);

export const selectLayoutUp = createSelector(
  selectLayout,
  (state: ImLayoutState) => state.get(ImLayoutStateKeys.up)
);
