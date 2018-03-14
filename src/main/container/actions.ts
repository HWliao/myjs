import { BaseAction } from '../store/actions';
import { createAction } from 'typesafe-actions';
import { createActionCFWithJustType } from '../utils/action-utils';

export enum ImRootActionType {
  init = '[im-root] init',
  destroy = '[im-root] destroy'
}

export type ImRootInitAction = BaseAction<ImRootActionType.init>;

export const imRootInitAction = createAction(
  ImRootActionType.init,
  createActionCFWithJustType(ImRootActionType.init)
);

export type ImRootDestroyAction = BaseAction<ImRootActionType.destroy>;

export const imRootDestroyAction = createAction(
  ImRootActionType.destroy,
  createActionCFWithJustType(ImRootActionType.destroy)
);
