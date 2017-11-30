import { LOGIN, LOGOUT } from '../model/action';

/**
 * 登入状态变化处理
 * @param state
 * @param action
 * @return {boolean}
 */
export function isLogin(state = false, action) {
  switch (action.type) {
    case LOGIN:
      return true;
    case LOGOUT:
      return false;
    default:
      return state;
  }
}
