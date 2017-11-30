import { createAction, SIDEBAR_DOWN, SIDEBAR_UP } from '../../model/action';

export function sideUpOrDown(flag = true) {
  return createAction(flag ? SIDEBAR_UP : SIDEBAR_DOWN, flag);
}
