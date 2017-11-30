import { SIDEBAR_DOWN, SIDEBAR_UP } from '../../model/action';

export function isSidebarUp(state = false, action) {
  switch (action.type) {
    case SIDEBAR_UP:
      return true;
    case SIDEBAR_DOWN:
      return false;
    default:
      return state;
  }
}
