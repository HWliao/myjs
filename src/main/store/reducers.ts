import { ReducersMapObject } from 'redux';
import { combineReducers } from 'redux-immutable';
import { Map } from 'immutable';
import { imLayoutReducer } from '../container/im-layout/reducers';

export interface BaseState<K = any, V = any> extends Map<K, V> {

}

export enum RootStateKeys {
  layout = 'layout'
}

export type RootState = BaseState<RootStateKeys, any>;

export const reducers: ReducersMapObject = {
  layout: imLayoutReducer
};

export function createRootReducer() {
  return combineReducers(reducers);
}
