import { LOGIN, LOGOUT, SDK_CONNECT, SDK_DISCONNECT, SDK_WILL_CONNECT } from '../model/action';

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

/**
 * 用户account
 * @param state
 * @param action
 * @return {{}}
 */
export function userAccount(state = {}, action) {
  switch (action.type) {
    case LOGIN:
      return Object.assign({}, action.payload);
    case LOGOUT:
      return {};
    default:
      return state;
  }
}

export function isSdkConnected(state = false, action) {
  switch (action.type) {
    case SDK_CONNECT:
      return true;
    case SDK_WILL_CONNECT:
    case SDK_DISCONNECT:
      return false;
    default:
      return state;
  }
}

export function sdkConnectCount(state = 0, action) {
  if (action.type === SDK_CONNECT) {
    return action.payload.count;
  }
  return state;
}

export function sdkDriverInfo(state = null, action) {
  if (action.type === SDK_CONNECT) {
    return Object.assign({}, action.payload.driverInfo || {});
  }
  return state;
}

export function sdkWillConnectInfo(state = null, action) {
  switch (action.type) {
    case SDK_CONNECT:
    case SDK_DISCONNECT:
      return null;
    case SDK_WILL_CONNECT:
      return Object.assign(action.payload);
    default:
      return state;
  }
}

export function error(state = null, action) {
  if (action.error) {
    return Object.assign({}, action.payload);
  }
  return state;
}
