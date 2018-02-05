import { Injectable } from '@angular/core';
import { DocMenuModel } from './doc-menu.model';
import createIm from '../../../src/main';
import { Im } from '../../../src/im-api';

const init = { context: '初始化', method: 'createIm' };

export const ROOT_MENU = 'root';

@Injectable()
export class ImApiService {

  private menus: DocMenuModel[];
  private im: Im;

  constructor() {
  }

  /**
   * 获取菜单项
   * @returns {Promise<DocMenuModel[]>}
   */
  getMenuItems(): Promise<DocMenuModel[]> {
    if (!this.menus) {
      this.menus = [];
      const menu0 = { key: ROOT_MENU, items: [] };
      menu0.items.push({ context: init.context, disable: false, triggerMethod: init.method });

      this.menus.push(menu0);
    }
    return Promise.resolve(this.menus);
  }

  [init.method]() {
    const config = {};
    return createIm(config)
      .then((im) => {
        this.im = im;
        window['im'] = im;
      })
      .catch(() => this.errorTip('创建im实例失败'));
  }

  /**
   * 错误提示
   * @param err
   */
  errorTip(err: any) {
    console.error(err);
  }
}
