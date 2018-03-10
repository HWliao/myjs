import { createSelector } from 'reselect';
import { RootState, RootStateKeys } from '../../store/reducers';
import { ImApiState, ImApiStateKeys } from './reducers';

export const selectImApiState = (state: RootState) => state.get(RootStateKeys.api);

export const selectImApiInited = createSelector(
  selectImApiState,
  (state: ImApiState) => state.get(ImApiStateKeys.inited)
);
