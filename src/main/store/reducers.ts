import { ReducersMapObject } from 'redux';
import { combineReducers } from 'redux-immutable';
import { Map } from 'immutable';
import { createApiReducers, ImApiState } from '../im-api/reducers';
import { createImRootReducers, ImRootState } from '../container/reducers';
import { createCoreReducers } from '../im-core/reducers';

export interface BaseState<K = any, V = any> extends Map<K, V> {

}

export enum RootStateKeys {
  component = 'component',
  main = 'main',
  core = 'core'
}

export type RootStateValues = ImRootState | ImApiState;

export type RootState = BaseState<RootStateKeys, RootStateValues>;

export const reducers: ReducersMapObject = {
  [RootStateKeys.component]: createImRootReducers(),
  [RootStateKeys.main]: createApiReducers(),
  [RootStateKeys.core]: createCoreReducers()
};

export const createRootReducer = () => combineReducers<RootState>(reducers);
