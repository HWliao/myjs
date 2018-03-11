import { ReducersMapObject } from 'redux';
import { combineReducers } from 'redux-immutable';
import { Map } from 'immutable';
import { imLayoutReducer } from '../container/im-layout/reducers';
import { imApiReducer } from '../im-api/reducers';

export interface BaseState<K = any, V = any> extends Map<K, V> {

}

export enum RootStateKeys {
  layout = 'layout',
  api = 'api'
}

export type RootState = BaseState<RootStateKeys, any>;

export const reducers: ReducersMapObject = {
  layout: imLayoutReducer,
  api: imApiReducer
};

export function createRootReducer() {
  return combineReducers<RootState>(reducers);
}
