import {
  ImLayoutActions, ImLayoutDownAction, ImLayoutHideAction, ImLayoutShowAction,
  ImLayoutUpAction
} from '../actions/im-layout.action';

export function imLayoutShowReducer(state: boolean = false, action: ImLayoutShowAction | ImLayoutHideAction): boolean {
  switch (action.type) {
    case ImLayoutActions.IM_LAYOUT_SHOW:
      return true;
    case ImLayoutActions.IM_LAYOUT_HIDE:
      return false;
    default:
      return state;
  }
}

export function imLayoutUpReducer(state: boolean = false, action: ImLayoutUpAction | ImLayoutDownAction): boolean {
  switch (action.type) {
    case ImLayoutActions.IM_LAYOUT_UP:
      return true;
    case ImLayoutActions.IM_LAYOUT_DOWN:
      return false;
    default:
      return state;
  }
}
