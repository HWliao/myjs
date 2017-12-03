import {
  LOGIN,
  LOGOUT,
  SDK_CONNECT,
  SDK_DISCONNECT,
  SDK_LOGIN_PORTS_CHANGE,
  SDK_SYNC_DONE,
  SDK_UPDATE_MY_INFO,
  SDK_UPDATE_SESSIONS,
  SDK_UPDATE_USER,
  SDK_WILL_CONNECT,
} from '../model/action';

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

export function sdkLoginPorts(state = [], action) {
  if (action.type === SDK_LOGIN_PORTS_CHANGE) {
    return action.payload.map(loginPort => Object.assign({}, loginPort));
  }
  return state;
}

export function sdkMyInfo(state = {}, action) {
  if (action.type === SDK_UPDATE_MY_INFO) {
    return Object.assign({}, action.payload);
  }
  return state;
}

export function sdkSessionTime(state = 0, action) {
  if (action.type === SDK_UPDATE_SESSIONS) {
    return action.meta.updateTime;
  } else if (action.type === SDK_SYNC_DONE) {
    return action.meta.updateTime;
  } else if (action.type === LOGIN) {
    return action.meta.updateTime;
  }
  return state;
}

export function sdkSessions(state = [], action) {
  if (action.type === SDK_UPDATE_SESSIONS) {
    return [].concat(action.meta.sessions);
  }
  return state;
}

export function sdkCurrUpdateSessions(state = [], action) {
  if (action.type === SDK_UPDATE_SESSIONS) {
    return [].concat(action.payload);
  }
  return state;
}

export function error(state = null, action) {
  if (action.error) {
    return Object.assign({}, action.payload);
  }
  return state;
}

export function sdkSyncDone(state = false, action) {
  if (action.type === SDK_SYNC_DONE) {
    return true;
  }
  return state;
}

export function sdkUpdateUserTime(state = 0, action) {
  if (action.type === SDK_UPDATE_USER) {
    return action.meta.updateTime;
  }
  return state;
}

export function sdkCurrUpdateUsers(state = [], action) {
  if (action.type === SDK_UPDATE_USER) {
    return [].concat(action.payload);
  }
  return state;
}
