import {
  createAction,
  ERROR,
  LOGIN,
  LOGOUT,
  SDK_CONNECT,
  SDK_DISCONNECT,
  SDK_LOGIN_PORTS_CHANGE, SDK_RESET_CURR_SESSION, SDK_SET_CURR_SESSION, SDK_SYNC_DONE,
  SDK_UPDATE_MY_INFO,
  SDK_UPDATE_SESSIONS, SDK_UPDATE_USER,
  SDK_WILL_CONNECT,
} from '../model/action';

/**
 * 登入
 * @param userAccount
 * @return {{type, payload, error, meta}|*}
 */
export function login(userAccount) {
  return createAction(LOGIN, userAccount, false, { updateTime: new Date().getTime() });
}

/**
 * 登出
 * @return {{type, payload, error, meta}|*}
 */
export function logout() {
  return createAction(LOGOUT, {});
}

/**
 * sdk建立连接
 * @param connectNum
 * @return {{type, payload, error, meta}|*}
 */
export function sdkConnected(connectNum) {
  return createAction(SDK_CONNECT, connectNum, false, { updateTime: new Date().getTime() });
}

/**
 * 断开连接
 * @return {{type, payload, error, meta}|*}
 */
export function sdkDisconnected() {
  return createAction(SDK_DISCONNECT, '');
}

/**
 * sdk重新连接
 * @param obj
 * @return {{type, payload, error, meta}|*}
 */
export function sdkWillConnect(obj) {
  return createAction(SDK_WILL_CONNECT, { time: new Date().getTime(), retry: obj.retryCount });
}

/**
 * 多段登入状态变化
 * @param loginPorts
 * @return {{type, payload, error, meta}|*}
 */
export function sdkLoginPortsChange(loginPorts) {
  return createAction(SDK_LOGIN_PORTS_CHANGE, loginPorts);
}

/**
 * 更新当前用户信息
 * @param info
 * @return {{type, payload, error, meta}|*}
 */
export function sdkUpdateMyInfo(info) {
  return createAction(SDK_UPDATE_MY_INFO, {
    account: info.account,
    nick: info.nick,
    avatar: info.avatar,
    createTime: info.createTime,
    updateTime: info.updateTime,
  });
}

export function sdkUpdateSessions(sessions = [], totalSessions = []) {
  return createAction(SDK_UPDATE_SESSIONS, [].concat(sessions), false, {
    updateTime: new Date().getTime(),
    sessions: [].concat(totalSessions),
  });
}

/**
 * 错误
 * @param e
 * @return {{type, payload, error, meta}|*}
 */
export function error(e) {
  return createAction(ERROR, {
    time: new Date().getTime(),
    code: e.code,
    message: e.message,
  }, true);
}

/**
 * 数据同步完成
 * @return {{type, payload, error, meta}|*}
 */
export function sdkSyncDeon() {
  return createAction(SDK_SYNC_DONE, true, false, { updateTime: new Date().getTime() });
}

/**
 * 更新用户信息
 * @param users
 * @return {{type, payload, error, meta}|*}
 */
export function sdkUpdateUser(users = []) {
  return createAction(SDK_UPDATE_USER, users, false, { updateTime: new Date().getTime() });
}

/**
 * 设置当前会话
 * @param sessionId
 * @return {{type, payload, error, meta}|*}
 */
export function sdkSetCurrSession(sessionId) {
  return createAction(SDK_SET_CURR_SESSION, sessionId, false, { updateTime: new Date().getTime() });
}

/**
 * 重置当前会话
 * @return {{type, payload, error, meta}|*}
 */
export function sdkResetCurrSession() {
  return createAction(SDK_RESET_CURR_SESSION, false, false, { updateTime: new Date().getTime() });
}
