import { Injectable } from '@angular/core';
import { DocMenuModel } from '../doc-menu.model';
import createIm from '../../../../src/main';
import { Im } from '../../../../src/im-api';
import { MatSnackBar } from '@angular/material';

const component = { context: '组件', triggerFor: 'component' };
const createImM = { context: 'createIm', method: 'createIm' };
const setConfig = { context: 'setConfig', method: 'setConfig' };
const init = { context: 'init', method: 'init' };
const destroy = { context: 'destroy', method: 'destroy' };

export const ROOT_MENU = 'root';

@Injectable()
export class ImApiService {

  private menus: DocMenuModel[];
  private im: Im;

  constructor(private snackBar: MatSnackBar) {
  }

  /**
   * 获取菜单项
   * @returns {Promise<DocMenuModel[]>}
   */
  getMenuItems(): Promise<DocMenuModel[]> {
    if (!this.menus) {
      this.menus = [];
      // 根菜单
      const menu0 = { key: ROOT_MENU, items: [] };
      menu0.items.push({ context: component.context, disable: false, triggerForKey: component.triggerFor });

      // 组件子菜单
      const menu1 = { key: component.triggerFor, items: [] };
      menu1.items.push({ context: createImM.context, disalbe: false, triggerMethod: createImM.method });
      menu1.items.push({ context: setConfig.context, triggerMethod: setConfig.method });
      menu1.items.push({ context: init.context, disalbe: false, triggerMethod: init.method });
      menu1.items.push({ context: destroy.context, disable: false, triggerMethod: destroy.method });

      this.menus.push(menu0);
      this.menus.push(menu1);
    }
    return Promise.resolve(this.menus);
  }

  [setConfig.method]() {
    this.wrapExc(setConfig.method);
  }

  [init.method]() {
    this.wrapExc(init.method);
  }

  [destroy.method]() {
    this.wrapExc(destroy.method);
  }

  [createImM.method]() {
    return createIm()
      .then((im) => {
        this.im = im;
        window['im'] = im;
      })
      .catch(() => this.errorTip('创建im实例失败'));
  }

  errorTip(err: any) {
    console.error(err);
    this.tip(typeof err === 'string' ? err : '出错了');
  }

  tip(msg) {
    this.snackBar.open(msg, '知道了', { duration: 5000 });
  }

  wrapExc(method: string, ...args) {
    try {
      return this.im[method](...args);
    } catch (e) {
      this.errorTip(e);
    }
  }
}
