import { BaseAction } from '../../store/actions';
import { createAction } from 'typesafe-actions';

export enum ImSidebarActionType {
  clickHeader = '[im-sidebar] click header',
  clickLoginBtn = '[im-sidebar] click login btn',
  clickItem = '[im-sidebar] click item'
}

export type ImSidebarClickHeaderAction = BaseAction<ImSidebarActionType.clickHeader, boolean>;

function imSidebarClickHeaderActionCF(payload: boolean): ImSidebarClickHeaderAction {
  return {
    type: ImSidebarActionType.clickHeader,
    payload
  };
}

export const imSidebarClickHeaderAction = createAction(ImSidebarActionType.clickHeader, imSidebarClickHeaderActionCF);

export type ImSidebarClickLoginBtnAction = BaseAction<ImSidebarActionType.clickLoginBtn>;

function imSidebarClickLoginBtnActionCF(): ImSidebarClickLoginBtnAction {
  return {type: ImSidebarActionType.clickLoginBtn};
}

export const imSidebarClickLoginBtnAction = createAction(
  ImSidebarActionType.clickLoginBtn,
  imSidebarClickLoginBtnActionCF
);

export  type ImSidebarClickItemAction = BaseAction<ImSidebarActionType.clickItem>;

function imSidebarClickItemActionCF(sessionId: string): ImSidebarClickItemAction {
  return {
    type: ImSidebarActionType.clickItem,
    payload: sessionId
  };
}

export const imSidebarClickItemAction = createAction(ImSidebarActionType.clickItem, imSidebarClickItemActionCF);
