import { BaseState } from '../../store/reducers';
import { Map } from 'immutable';
import { BaseAction } from '../../store/actions';
import { ImLayoutActionType } from './actions';

export enum ImLayoutStateKeys {
  show = 'show',
  up = 'up'
}

export type ImLayoutState = BaseState<ImLayoutStateKeys, boolean>;

export const initState = Map<ImLayoutStateKeys, boolean>({show: false, up: false});

export function imLayoutReducer(state: ImLayoutState = initState, action: BaseAction) {
  switch (action.type) {
    case ImLayoutActionType.show:
      return state.set(ImLayoutStateKeys.show, action.payload);
    case ImLayoutActionType.hide:
      return state.set(ImLayoutStateKeys.show, action.payload);
    case ImLayoutActionType.up:
      return state.set(ImLayoutStateKeys.up, action.payload);
    case ImLayoutActionType.down:
      return state.set(ImLayoutStateKeys.up, action.payload);
    default:
      return state;
  }
}
