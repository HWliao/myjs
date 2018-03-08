import { ReducersMapObject } from 'redux';
import { combineReducers } from 'redux-immutable';
import testReducer from '../container/im-test/reducers';
import { Map } from 'immutable';

export interface BaseState<K = any, V = any> extends Map<K, V> {

}

export enum RootStateKeys {
  test = 'test'
}

export type RootState = BaseState<RootStateKeys, any>;

export const reducers: ReducersMapObject = {
  test: testReducer
};

export function createRootReducer() {
  return combineReducers(reducers);
}
