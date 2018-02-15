import { Action } from '@ngrx/store';

export enum ImLayoutActions {
  IM_LAYOUT_SHOW = '[UI] show',
  IM_LAYOUT_HIDE = '[UI] hide',
  IM_LAYOUT_UP = '[UI] up',
  IM_LAYOUT_DOWN = '[UI] down'
}

export class ImLayoutShowAction implements Action {
  readonly type = ImLayoutActions.IM_LAYOUT_SHOW;
}

export class ImLayoutHideAction implements Action {
  readonly type = ImLayoutActions.IM_LAYOUT_HIDE;
}

export class ImLayoutUpAction implements Action {
  readonly type = ImLayoutActions.IM_LAYOUT_UP;
}

export class ImLayoutDownAction implements Action {
  readonly type = ImLayoutActions.IM_LAYOUT_DOWN;
}
