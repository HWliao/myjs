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
const isShow = { context: 'isShow', method: 'isShow' };
const isUp = { context: 'isUp', method: 'isUp' };

const ui = { context: 'UI', triggerFor: 'ui' };
const show = { context: 'show', method: 'show' };
const up = { context: 'up', method: 'toggleUpDown' };

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
      menu0.items.push(this.getMenuItem(component));
      menu0.items.push(this.getMenuItem(status));
      menu0.items.push(this.getMenuItem(ui));

      // 组件子菜单
      const menu1 = { key: component.triggerFor, items: [] };
      menu1.items.push(this.getMenuItem(createImM));
      menu1.items.push(this.getMenuItem(setConfig));
      menu1.items.push(this.getMenuItem(init));
      menu1.items.push(this.getMenuItem(destroy));

      // 状态子菜单
      const menu2 = { key: status.triggerFor, items: [] };
      menu2.items.push(this.getMenuItem(isInited));
      menu2.items.push(this.getMenuItem(getConfig));
      menu2.items.push(this.getMenuItem(isShow));
      menu2.items.push(this.getMenuItem(isUp));

      const menu3 = { key: ui.triggerFor, items: [] };
      menu3.items.push(this.getMenuItem(show));
      menu3.items.push(this.getMenuItem(up));

      this.menus.push(menu0);
      this.menus.push(menu1);
      this.menus.push(menu2);
      this.menus.push(menu3);
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

  [show.method]() {
    this.wrapExc(show.method, !this.im.isShow());
  }

  [up.method]() {
    this.wrapExc(up.method);
  }

  [isShow.method]() {
    this.tip(this.wrapExc(isShow.method));
  }

  [isUp.method]() {
    this.tip(this.wrapExc(isUp.method));
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

  getMenuItem(model: any) {
    return { context: model.context, triggerMethod: model.method, disable: false, triggerForKey: model.triggerFor };
  }

}
