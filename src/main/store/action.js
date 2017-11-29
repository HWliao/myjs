import $ from 'jquery';

/**
 * 创建标准的action
 */
export function createAction(type, payload, error = true, meta) {
  if (!$.isNumeric(type)) {
    throw new Error(`the action type must be a number,not null or other type. ${type}`);
  }
  if (!payload) {
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
export const LAYOUT_SMALL = 1;
// layout large状态
export const LAYOUT_LARGE = 2;
// layout medium状态
export const LAYOUT_MEDIUM = 3;
