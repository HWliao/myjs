// 已经登入
export const IS_LOGINED = 'isLogined';
// 未登入
export const NOT_LOGIN = 'notLogin';
// 发送消息错误
export const SEND_MSG_ERROR = 'send_msg_error';

export function createError(code, error) {
  return {
    code,
    error,
  };
}
