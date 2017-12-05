import $ from 'jquery';

/**
 * 创建标准的action
 */
export function createAction(type, payload, error = false, meta) {
  if ($.isEmptyObject(type)) {
    throw new Error(`the action type must be a empty. ${type}`);
  }
  if (payload === null || payload === undefined) {
    throw new Error(`the action payload can not be null/undefined. ${payload}`);
  }
  return {
    type,
    payload,
    error,
    meta,
  };
}

// 这里所有actionType必须用数字

// layout small状态
export const LAYOUT_SHOW = 'layout_show';
// layout large状态
export const LAYOUT_HIDE = 'layout_hide';
// sidebar 展开
export const SIDEBAR_UP = 'sidebar_up';
// sidebar 收起
export const SIDEBAR_DOWN = 'sidebar_down';

// 登入
export const LOGIN = 'login';
// 登出
export const LOGOUT = 'logout';

// sdk连接
export const SDK_CONNECT = 'sdkConnect';
// sdk断开连接
export const SDK_DISCONNECT = 'sdkDisconnect';
// sdk重新连接
export const SDK_WILL_CONNECT = 'sdkWillConnect';
// 多段登入状态变化
export const SDK_LOGIN_PORTS_CHANGE = 'sdkLoginPortschange';
// 更新当前用户信息
export const SDK_UPDATE_MY_INFO = 'sdkUpdateMyInfo';
// 更新会话
export const SDK_UPDATE_SESSIONS = 'sdkUpdateSessions';
// 设置当前会话
export const SDK_SET_CURR_SESSION = 'sdkSetCurrSession';
// 重置当前会话
export const SDK_RESET_CURR_SESSION = 'sdkResetCurrSession';
// 一条新消息
export const SDK_ONE_NEW_MSG = 'sdkOneNewMsg';
// 更新用户信息
export const SDK_UPDATE_USER = 'sdkUpdateUser';
// 同步完成
export const SDK_SYNC_DONE = 'sdkSyncDone';

// error
export const ERROR = 'error';
