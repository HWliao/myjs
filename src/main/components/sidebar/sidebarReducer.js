import { SDK_CONSULTATIVE, SDK_CONSULTATIVE_FAIL, SIDEBAR_DOWN, SIDEBAR_UP } from '../../model/action';

export function isSidebarUp(state = false, action) {
  switch (action.type) {
    case SIDEBAR_UP:
      return true;
    case SIDEBAR_DOWN:
      return false;
    case SDK_CONSULTATIVE:
    case SDK_CONSULTATIVE_FAIL:
      return true;
    default:
      return state;
  }
}
