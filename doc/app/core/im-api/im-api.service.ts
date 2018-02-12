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

const status = { context: '状态', triggerFor: 'status' };
const isInited = { context: 'isInited', method: 'isInited' };
const getConfig = { context: 'getConfig', method: 'getConfig' };

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
      menu0.items.push({ context: status.context, disable: false, triggerForKey: status.triggerFor });

      // 组件子菜单
      const menu1 = { key: component.triggerFor, items: [] };
      menu1.items.push({ context: createImM.context, disalbe: false, triggerMethod: createImM.method });
      menu1.items.push({ context: setConfig.context, triggerMethod: setConfig.method });
      menu1.items.push({ context: init.context, disalbe: false, triggerMethod: init.method });
      menu1.items.push({ context: destroy.context, disable: false, triggerMethod: destroy.method });

      // 状态子菜单
      const menu2 = { key: status.triggerFor, items: [] };
      menu2.items.push({ context: isInited.context, disable: false, triggerMethod: isInited.method });
      menu2.items.push({ context: getConfig.context, disable: false, triggerMethod: getConfig.method });

      this.menus.push(menu0);
      this.menus.push(menu1);
      this.menus.push(menu2);
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

  [isInited.method]() {
    const inited = this.wrapExc(isInited.method);
    this.tip(inited);
  }

  [getConfig.method]() {
    const config = this.wrapExc(getConfig.method);
    console.log(config);
    this.tip('请看控制台');
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
