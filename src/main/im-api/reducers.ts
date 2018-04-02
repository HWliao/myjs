import { BaseState } from '../store/reducers';
import { fromJS, Map } from 'immutable';
import { ImApiActionType, ImApiSetConfigAction } from './actions';
import { ConfigModelMap, defaultConfig } from './model/config.model';

export enum ImApiStateKeys {
  config = 'config'
}

export type ImApiStateValues = ConfigModelMap;

export type ImApiState = BaseState<ImApiStateKeys, ImApiStateValues>;

export const initState: ImApiState = Map<ImApiStateKeys, ImApiStateValues>({
  [ImApiStateKeys.config]: fromJS(defaultConfig)
});

export function imApiReducer(state: ImApiState = initState, action: ImApiSetConfigAction): ImApiState {
  switch (action.type) {
    case ImApiActionType.setConfig:
      const config: ConfigModelMap = <ConfigModelMap> state.get(ImApiStateKeys.config);
      return state.set(ImApiStateKeys.config, config.merge(<ConfigModelMap> action.payload));
    default:
      return state;
  }
}

export const createApiReducers = () => imApiReducer;
