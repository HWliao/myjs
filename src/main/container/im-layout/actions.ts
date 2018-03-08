import { BaseAction } from '../../store/actions';
import { createAction } from 'typesafe-actions';

export enum ImLayoutActionType {
  show = '[im-layout] show',
  hide = '[im-layout] hide',
  up = '[im-layout] up',
  down = '[im-layout] down'
}

export type ImLayoutShowAction = BaseAction<ImLayoutActionType.show, boolean>;

function imLayoutShowActionCF(): ImLayoutShowAction {
  return {
    type: ImLayoutActionType.show,
    payload: true
  };
}

export const imLayoutShowAction = createAction(ImLayoutActionType.show, imLayoutShowActionCF);

export type ImLayoutHideAction = BaseAction<ImLayoutActionType.hide, boolean>;

function imLayoutHideActionCF(): ImLayoutHideAction {
  return {
    type: ImLayoutActionType.hide,
    payload: false
  };
}

export const imLayoutHideAction = createAction(ImLayoutActionType.hide, imLayoutHideActionCF);

export type ImLayoutUpAction = BaseAction<ImLayoutActionType.up, boolean>;

function imLayoutUpCF(): ImLayoutUpAction {
  return {
    type: ImLayoutActionType.up,
    payload: true
  };
}

export const imLayoutUpAction = createAction(ImLayoutActionType.up, imLayoutUpCF);

export type ImLayoutDownAction = BaseAction<ImLayoutActionType.down, boolean>;

function imLayoutDownCF(): ImLayoutDownAction {
  return {
    type: ImLayoutActionType.down,
    payload: false
  };
}

export const imLayoutDownAction = createAction(ImLayoutActionType.down, imLayoutDownCF);
