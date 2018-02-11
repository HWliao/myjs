import { Action } from '@ngrx/store';
import { State } from '../reducers/config.reducer';

export enum ConfigActions {
  CONFIG_SET = '[Config] set'
}

export class ConfigSetAction implements Action {
  readonly type = ConfigActions.CONFIG_SET;
  readonly payload: State;

  constructor(payload: State = {}) {
    this.payload = payload;
  }
}
