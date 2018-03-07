import { ReducersMapObject } from 'redux';
import { combineReducers } from 'redux-immutable';
import testReducer from '../container/reducers';
import { Map } from 'immutable';

export enum RootStateKeys {
  test = 'test'
}

export type RootState = Map<RootStateKeys, any>;

export const reducers: ReducersMapObject = {
  test: testReducer
};

export function createRootReducer() {
  return combineReducers(reducers);
}
