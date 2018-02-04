import { DocMenuItemModel } from './doc-menu-item.model';

export class DocMenuModel {
  /**
   * 菜单对应的key
   */
  key: string;
  /**
   * 菜单对应的菜单项
   */
  items: DocMenuItemModel[];
}
