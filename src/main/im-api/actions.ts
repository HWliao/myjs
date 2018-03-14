import { BaseAction } from '../store/actions';
import { createAction } from 'typesafe-actions';
import { ConfigModel, ConfigModelMap } from './model/config.model';
import { Map } from 'immutable';

export enum ImApiActionType {
  setConfig = '[im] set config'
}

export type ImApiSetConfigAction = BaseAction<ImApiActionType.setConfig, ConfigModelMap>;

function imApiSetConfigActionCF(config: ConfigModel): ImApiSetConfigAction {
  return {
    type: ImApiActionType.setConfig,
    payload: Map<keyof ConfigModel, any>(config)
  };
}

export const imApiSetConfigAction = createAction(ImApiActionType.setConfig, imApiSetConfigActionCF);
