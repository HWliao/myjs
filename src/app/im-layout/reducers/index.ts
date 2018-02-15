import { ActionReducerMap } from '@ngrx/store';
import { imLayoutShowReducer, imLayoutUpReducer } from './im-layout.reducer';

export const feature = 'imLayout';

export interface State {
  show: boolean;
  up: boolean;
}

export const reducers: ActionReducerMap<State> = {
  show: imLayoutShowReducer,
  up: imLayoutUpReducer
};
