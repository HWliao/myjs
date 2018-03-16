import { BaseState } from '../store/reducers';
import { ReducersMapObject } from 'redux';
import { BaseAction } from '../store/actions';
import { ImRootActionType } from './actions';
import { combineReducers } from 'redux-immutable';
import { imLayoutReducer, ImLayoutState } from './im-layout/reducers';

export enum ImRootStateKeys {
  inited = 'inited',
  layout = 'layout'
}

export type ImRootStateValues = boolean | ImLayoutState;

export type ImRootState = BaseState<ImRootStateKeys, ImRootStateValues>;

export const imRootInitState: boolean = false;

export function imRootInitedReducer(state: boolean = imRootInitState, action: BaseAction): boolean {
  switch (action.type) {
    case ImRootActionType.init:
      return true;
    case ImRootActionType.destroy:
      return false;
    default:
      return state;
  }
}

const reducers: ReducersMapObject = {
  [ImRootStateKeys.inited]: imRootInitedReducer,
  [ImRootStateKeys.layout]: imLayoutReducer
};

export const createImRootReducers = () => combineReducers<ImRootState>(reducers);
