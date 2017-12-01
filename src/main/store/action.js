import { createAction, ERROR, LOGIN, LOGOUT, SDK_CONNECT, SDK_DISCONNECT, SDK_WILL_CONNECT } from '../model/action';

/**
 * 登入
 * @param userAccount
 * @return {{type, payload, error, meta}|*}
 */
export function login(userAccount) {
  return createAction(LOGIN, userAccount);
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
  return createAction(SDK_CONNECT, connectNum);
}

/**
 * 断开连接
 * @return {{type, payload, error, meta}|*}
 */
export function sdkDisconnected() {
  return createAction(SDK_DISCONNECT);
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
