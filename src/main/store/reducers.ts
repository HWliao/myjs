import { ReducersMapObject } from 'redux';
import { combineReducers } from 'redux-immutable';
import { Map } from 'immutable';
import { imLayoutReducer, ImLayoutState } from '../container/im-layout/reducers';
import { imApiReducer, ImApiState } from '../container/im-api/reducers';

export interface BaseState<K = any, V = any> extends Map<K, V> {

}

export enum RootStateKeys {
  layout = 'layout',
  api = 'api'
}

type SubState = ImLayoutState | ImApiState;
export type RootState = BaseState<RootStateKeys, SubState>;

export const reducers: ReducersMapObject = {
  layout: imLayoutReducer,
  api: imApiReducer
};

export function createRootReducer() {
  return combineReducers<RootState>(reducers);
}
