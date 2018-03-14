import { createSelector } from 'reselect';
import { ImApiState, ImApiStateKeys } from './reducers';
import { selectMain } from '../store/selectors';
import { ConfigModelMap } from './model/config.model';

export const selectImApiConfig = createSelector(
  selectMain,
  (state: ImApiState) => <ConfigModelMap> state.get(ImApiStateKeys.config)
);
