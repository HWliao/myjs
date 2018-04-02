import { createAction, FluxStandardAction } from 'typesafe-actions';
import { createActionCFWithJustType } from '../utils/action-utils';

export interface BaseAction<T extends string = string, P = any, M= any> extends FluxStandardAction<T, P, M> {

}

export enum ImEmptyActionType {
  empty = '[im-empty] empty'
}

/**
 * 这是一个空的action
 */
export const imEmptyAction = createAction(
  ImEmptyActionType.empty,
  createActionCFWithJustType(ImEmptyActionType.empty)
);
