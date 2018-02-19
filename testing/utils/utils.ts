import * as AppState from '../../src/app/reducers';
import * as ImOutletState from '../../src/app/im-outlet/reducers';
import * as ImLayoutState from '../../src/app/im-layout/reducers';
import { combineReducers } from '@ngrx/store';

export const reducers = {
  ...AppState.reducers,
  [ImOutletState.feature]: combineReducers(ImOutletState.reducers),
  [ImLayoutState.feature]: combineReducers(ImLayoutState.reducers)
};
