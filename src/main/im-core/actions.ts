import { BaseAction } from '../store/actions';
import { createAction } from 'typesafe-actions';
import { createActionCFWithJustType } from '../utils/action-utils';

export enum ImCoreActionType {
  init = '[im-core] init',
  desctroy = '[im-core] destroy',
  connect = '[im-core] connect',
  disconnect = '[im-core] disconnect'
}

export type ImCoreInitAction = BaseAction<ImCoreActionType.init>;
export const imCoreInitAction = createAction(
  ImCoreActionType.init,
  createActionCFWithJustType(ImCoreActionType.init)
);

export type ImCoreDestroyAction = BaseAction<ImCoreActionType.desctroy>;
export const imCoreDestroyAction = createAction(
  ImCoreActionType.desctroy,
  createActionCFWithJustType(ImCoreActionType.desctroy)
);

export type ImCoreConnectAction = BaseAction<ImCoreActionType.connect>;
export const imCoreConnectAction = createAction(
  ImCoreActionType.connect,
  createActionCFWithJustType(ImCoreActionType.connect)
);

export type ImCoreDisconnectAction = BaseAction<ImCoreActionType.disconnect>;
export const imCoreDisconnectAction = createAction(
  ImCoreActionType.disconnect,
  createActionCFWithJustType(ImCoreActionType.disconnect)
);
