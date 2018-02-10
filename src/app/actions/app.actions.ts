import { Action } from '@ngrx/store';

export enum AppActions {
  APP_INIT = '[App] init',
  APP_DESTROY = '[App] destroy'
}

export class AppInitAction implements Action {
  readonly type = AppActions.APP_INIT;
}

export class AppDestroyAction implements Action {
  readonly type = AppActions.APP_DESTROY;
}
