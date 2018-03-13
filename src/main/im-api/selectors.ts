import { createSelector } from 'reselect';
import { RootState, RootStateKeys } from '../store/reducers';
import { ImApiState, ImApiStateKeys } from './reducers';
import { ConfigModelMap } from './model/config.model';

export const selectImApiState = (state: RootState) => state.get(RootStateKeys.api);

export const selectImApiInited = createSelector(
  selectImApiState,
  (state: ImApiState) => <boolean> state.get(ImApiStateKeys.inited)
);

export const selectImApiConfig = createSelector(
  selectImApiState,
  (state: ImApiState) => <ConfigModelMap> state.get(ImApiStateKeys.config)
);
