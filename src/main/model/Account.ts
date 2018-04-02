/**
 * 账户
 */
export class Account {
  /**
   * 账户id
   */
  accid: string;
  /**
   * 账户密码
   */
  token: string;
}

export type AccountMap = Map<keyof Account, any>;
