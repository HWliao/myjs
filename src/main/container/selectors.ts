import { createSelector } from 'reselect';
import { ImRootState, ImRootStateKeys } from './reducers';
import { selectImRoot } from '../store/selectors';
import { ImLayoutState } from './im-layout/reducers';

export const selectImRootInited = createSelector(
  selectImRoot,
  (state: ImRootState) => <boolean> state.get(ImRootStateKeys.inited)
);

export const selectImLayoutState = createSelector(
  selectImRoot,
  (state: ImRootState) => <ImLayoutState> state.get(ImRootStateKeys.layout)
);
