import { BaseState } from '../store/reducers';
import { Map } from 'immutable';
import { ImApiActions, ImApiActionType } from './actions';
import { ConfigModelMap } from './model/config.model';

export enum ImApiStateKeys {
  inited = 'inited',
  config = 'config'
}

export type ImApiState = BaseState<ImApiStateKeys, boolean | ConfigModelMap>;

export const initState: ImApiState = Map<ImApiStateKeys, boolean>({inited: false});

export function imApiReducer(state: ImApiState = initState, action: ImApiActions): ImApiState {
  switch (action.type) {
    case ImApiActionType.init:
      return state.set(ImApiStateKeys.inited, true);
    case ImApiActionType.destroy:
      return state.set(ImApiStateKeys.inited, false);
    case ImApiActionType.setConfig:
      const config: ConfigModelMap = <ConfigModelMap> state.get(ImApiStateKeys.config);
      return state.set(ImApiStateKeys.config, config.merge(<ConfigModelMap> action.payload));
    default:
      return state;
  }
}
