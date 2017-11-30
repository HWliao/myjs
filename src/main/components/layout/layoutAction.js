import { LAYOUT_SHOW, LAYOUT_HIDE, createAction } from '../../model/action';

export function showLayout() {
  return createAction(LAYOUT_SHOW, true);
}

export function hideLayout() {
  return createAction(LAYOUT_HIDE, false);
}
