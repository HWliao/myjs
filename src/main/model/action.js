import $ from 'jquery';

/**
 * 创建标准的action
 */
export function createAction(type, payload, error = true, meta) {
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
