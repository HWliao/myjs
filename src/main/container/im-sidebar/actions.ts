import { BaseAction } from '../../store/actions';
import { createAction } from 'typesafe-actions';

export enum ImSidebarActionType {
  clickHeader = '[im-sidebar] click header'
}

export type ImSidebarClickHeaderAction = BaseAction<ImSidebarActionType.clickHeader, boolean>;

function imSidebarClickHeaderActionCF(payload: boolean): ImSidebarClickHeaderAction {
  return {
    type: ImSidebarActionType.clickHeader,
    payload
  };
}

export const imSidebarClickHeaderAction = createAction(ImSidebarActionType.clickHeader, imSidebarClickHeaderActionCF);
