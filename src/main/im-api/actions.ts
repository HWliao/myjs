import { BaseAction } from '../store/actions';
import { createAction } from 'typesafe-actions';
import { ConfigModel, ConfigModelMap } from './model/config.model';
import { Map } from 'immutable';

export enum ImApiActionType {
  init = '[im-api] init',
  destroy = '[im-api] destroy',
  setConfig = '[im-api] set config'
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

export type ImApiSetConfigAction = BaseAction<ImApiActionType.setConfig, ConfigModelMap>;

function imApiSetConfigActionCF(config: ConfigModel): ImApiSetConfigAction {
  return {
    type: ImApiActionType.setConfig,
    payload: Map<keyof ConfigModel, any>(config)
  };
}

export const imApiSetConfigAction = createAction(ImApiActionType.setConfig, imApiSetConfigActionCF);

export type ImApiActions = ImApiInitAction | ImApiDestroyAction | ImApiSetConfigAction;
