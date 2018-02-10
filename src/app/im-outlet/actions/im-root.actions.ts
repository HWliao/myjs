import { Action } from '@ngrx/store';

export enum ImRootActions {
  ImRootInitAction = '[ImRoot] init',
  ImRootDestroyAction = '[ImRoot] destroy'
}

export class ImRootInit implements Action {
  readonly type = ImRootActions.ImRootInitAction;
}

export class ImRootDestroy implements Action {
  readonly type = ImRootActions.ImRootDestroyAction;
}

export type Actions = ImRootInit | ImRootDestroy;
