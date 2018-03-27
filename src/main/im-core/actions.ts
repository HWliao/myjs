import { BaseAction } from '../store/actions';
import { createAction } from 'typesafe-actions';
import { createActionCFWithJustType } from '../utils/action-utils';

export enum ImCoreActionType {
  init = '[im-core] init',
  desctroy = '[im-core] destroy'
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
