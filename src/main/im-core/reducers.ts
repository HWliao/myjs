import { BaseState } from '../store/reducers';
import { BaseAction } from '../store/actions';
import { ImCoreActionType } from './actions';
import { ReducersMapObject } from 'redux';
import { combineReducers } from 'redux-immutable';

export enum ImCoreStateKeys {
  inited = 'inited',
  connected = 'connected'
}

export type ImCoreStatecValues = boolean;

export type ImCoreState = BaseState<ImCoreStateKeys, ImCoreStatecValues>;

export function imCoreInitedReducer(state: boolean = false, action: BaseAction) {
  switch (action.type) {
    case ImCoreActionType.init:
      return true;
    case ImCoreActionType.desctroy:
      return false;
    default:
      return state;
  }
}

export function imCoreConnectedReducer(state: boolean = false, action: BaseAction) {
  switch (action.type) {
    case ImCoreActionType.connect:
      return true;
    case ImCoreActionType.disconnect:
      return false;
    default:
      return state;
  }
}

const reducers: ReducersMapObject = {
  [ImCoreStateKeys.inited]: imCoreInitedReducer,
  [ImCoreStateKeys.connected]: imCoreConnectedReducer
};

export const createCoreReducers = () => combineReducers(reducers);
