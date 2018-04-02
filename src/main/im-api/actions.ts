import { BaseAction } from '../store/actions';
import { createAction } from 'typesafe-actions';
import { ConfigModel, ConfigModelMap } from './model/config.model';
import { fromJS, Map } from 'immutable';
import { Account, AccountMap } from '../model/Account';
import { createActionCFWithJustType } from '../utils/action-utils';

export enum ImApiActionType {
  setConfig = '[im] set config',
  login = '[im] login',
  logout = '[im] logout'
}

export type ImApiSetConfigAction = BaseAction<ImApiActionType.setConfig, ConfigModelMap>;

function imApiSetConfigActionCF(config: ConfigModel): ImApiSetConfigAction {
  return {
    type: ImApiActionType.setConfig,
    payload: Map<keyof ConfigModel, any>(config)
  };
}

export const imApiSetConfigAction = createAction(ImApiActionType.setConfig, imApiSetConfigActionCF);

export type ImApiLoginAction = BaseAction<ImApiActionType.login, AccountMap>;

function imApiLoginActionCF(account: Account): ImApiLoginAction {
  return {
    type: ImApiActionType.login,
    payload: fromJS(account)
  };
}

export const imApiLoginAction = createAction(
  ImApiActionType.login,
  imApiLoginActionCF
);

export type ImApiLogoutAction = BaseAction<ImApiActionType.logout>;
export const imApitLogoutAction = createAction(
  ImApiActionType.logout,
  createActionCFWithJustType(ImApiActionType.logout)
);
