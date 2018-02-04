/**
 * 操作菜单对应的项目
 */
export class DocMenuItemModel {
  /**
   * 子菜单对应key
   */
  triggerForKey: string;
  /**
   * item 对应内容
   */
  context: string;
  /**
   * 是否有效
   */
  disable: boolean;
  /**
   * 点击触发方法
   */
  triggerMethod: string;
}
