import { createAction, SIDEBAR_DOWN, SIDEBAR_UP } from '../../model/action';

/**
 * 侧边栏收起/展开
 * @param flag
 * @return {{type, payload, error, meta}|*}
 */
export function sideUpOrDown(flag = true) {
  return createAction(flag ? SIDEBAR_UP : SIDEBAR_DOWN, flag);
}
