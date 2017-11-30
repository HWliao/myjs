// 已经登入
export const IS_LOGINED = 'isLogined';
// 未登入
export const NOT_LOGIN = 'notLogin';

export function createError(code, error) {
  return {
    code,
    error,
  };
}
