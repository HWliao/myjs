import { ReducersMapObject } from 'redux';
import { combineReducers } from 'redux-immutable';
import { Map } from 'immutable';
import { imApiReducer, ImApiState } from '../im-api/reducers';
import { createImRootReducers, ImRootState } from '../container/reducers';

export interface BaseState<K = any, V = any> extends Map<K, V> {

}

export enum RootStateKeys {
  component = 'component',
  main = 'main'
}

export type RootStateValues = ImRootState | ImApiState;

export type RootState = BaseState<RootStateKeys, RootStateValues>;

export const reducers: ReducersMapObject = {
  [RootStateKeys.component]: createImRootReducers(),
  [RootStateKeys.main]: imApiReducer
};

export const createRootReducer = () => combineReducers<RootState>(reducers);
