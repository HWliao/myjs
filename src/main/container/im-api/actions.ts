import { BaseAction } from '../../store/actions';
import { createAction } from 'typesafe-actions';

export enum ImApiActionType {
  init = '[im-api] init',
  destroy = '[im-api] destroy'
}

export type ImApiInitAction = BaseAction<ImApiActionType.init>;

function imApiInitActionCF(): ImApiInitAction {
  return {type: ImApiActionType.init};
}

export const imApiInitAction = createAction(ImApiActionType.init, imApiInitActionCF);

export type ImApiDestroyAction = BaseAction<ImApiActionType.destroy>;

function imApiDestroyActionCF(): ImApiDestroyAction {
  return {type: ImApiActionType.destroy};
}

export const imApiDestroyAction = createAction(ImApiActionType.destroy, imApiDestroyActionCF);
