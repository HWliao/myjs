import { BaseState } from '../../store/reducers';
import { Map } from 'immutable';
import { BaseAction } from '../../store/actions';
import { ImApiActionType } from './actions';

export enum ImApiStateKeys {
  inited = 'inited'
}

export type ImApiState = BaseState<ImApiStateKeys, boolean>;

export const initState: ImApiState = Map<ImApiStateKeys, boolean>({inited: false});

export function imApiReducer(state: ImApiState = initState, action: BaseAction): ImApiState {
  switch (action.type) {
    case ImApiActionType.init:
      return state.set(ImApiStateKeys.inited, true);
    case ImApiActionType.destroy:
      return state.set(ImApiStateKeys.inited, false);
    default:
      return state;
  }
}
