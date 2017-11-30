import { LAYOUT_SHOW, LAYOUT_HIDE } from '../../model/action';

export function isLayoutShow(state = false, action) {
  switch (action.type) {
    case LAYOUT_SHOW:
    case LAYOUT_HIDE:
      return action.payload;
    default:
      return state;
  }
}
