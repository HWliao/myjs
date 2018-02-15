import { Injectable } from '@angular/core';
import { DocListItemModel } from '../doc-list-item.model';

@Injectable()
export class ImDocService {
  /**
   * 快速开始 文档
   * @type {string}
   */
  private static QUICK_START_DOC = `
  <script type="text/javascript" src="http(s)://path/to/main.js"></script>
  `;

  private static SETTINGS_DOC = `
  {
    // 说明
    "lhwtest":"test"
  }
  `;
  private static LOGIN_DOC = `
  // 登入
  im.login('123106', '123456');
  `;

  private static LOGOUT_DOC = `
  // 登出
  im.logout();
  `;

  private static IM_INIT = `
    // im初始化分为以下几部分
    // 1.动态创建一个im实例
    // 2.设置config
    // 3.初始化组件

    // 调用全局函数创建一个im实例
    // 参数1(可选): 配置对象 若传递一个配置对象在内部自动调用im.setConfig(config)
    // 建议使用这种方式传递配置对象
    window.createIm(config?:ConfigModel)
    .then(( im:Im )=>{
      // 返回im实例

      // 设置配置对象
      // 参数1:配置对象
      // 可以多次调用,可以动态替换掉某些配置
      im.setConfig(config);

      // 初始化根组件
      // 在调用im.init之前必须至少调用一次im.setConfig
      // 可以在初始化和调用im.destroy后调用,否则会抛出异常
      im.init();

      // 绑定事件,其他初始化
      // 或者返回一个promise

      // 销毁根组件
      // 在调用im.destroy之前必须先调用im.init,否则会抛出异常
      im.destroy();

      // 注意这里的初始化和销毁都是针对根UI组件
      // 内部服务,数据 在createIm时被创建
    })
    .catch((err)=>{
      // 处理创建组件时的错误,一般不会发生
    })
  `;
  private static IM_STATUS = `
    // 初始化状态
    // 返回boolean值
    im.isInited();
    // 当前配置
    // 返回一config对象的拷贝
    im.getConfig()
    // 展开状态
    // 返回boolean值
    im.isUp();
    // 显示/隐藏状态
    // 返回boolean值
    im.isShow();
  `;
  private static IM_UI = `
    // 显示/隐藏
    // 参数1: true 显示 false 隐藏  默认 true
    im.show(flag:boolean);
    // 展开收起
    // 参数1: true up false down 不传递 toggle
    im.toggleUpDown(flag?:boolean);
  `;
  private static IM_APP = `
    yyy
  `;
  private static IM_BUSINESS = `
    zzz
  `;


  /**
   * 自增id
   * @type {number}
   */
  private id = 0;
  /**
   * 文档项目
   */
  private items: DocListItemModel[];

  constructor() {
  }


  /**
   * 获取列表数据
   * @return {Promise}
   */
  getItems(): Promise<DocListItemModel[]> {
    if (!this.items) {
      this.items = [];
      this.items.push(this.generateQuickStartModel());
      this.items.push(this.generateSettingsModel());
      this.items.push(this.generateMethodModel('组件', ImDocService.IM_INIT, '方法', true));
      this.items.push(this.generateMethodModel('状态', ImDocService.IM_STATUS));
      this.items.push(this.generateMethodModel('UI', ImDocService.IM_UI));
      this.items.push(this.generateMethodModel('应用', ImDocService.IM_APP));
      this.items.push(this.generateMethodModel('业务功能', ImDocService.IM_BUSINESS));
    }
    return Promise.resolve(this.items);
  }

  /**
   * 生成方法model
   * @param {string} content
   * @param {string} desc
   * @param {string} subHeader
   * @param {boolean} needDivider
   * @return {DocListItemModel}
   */
  generateMethodModel(content: string, desc: string, subHeader: string = null, needDivider = false) {
    return new DocListItemModel(++this.id, 'label_outlet', content, desc, subHeader, needDivider);
  }

  /**
   * 生成快速开始model
   * @return {DocListItemModel}
   */
  generateQuickStartModel(): DocListItemModel {
    return new DocListItemModel(++this.id, 'trending_up', '快速开始', ImDocService.QUICK_START_DOC, '入门', true);
  }

  /**
   * 生成配置model
   * @return {DocListItemModel}
   */
  generateSettingsModel() {
    return new DocListItemModel(++this.id, 'settings', '详细配置', ImDocService.SETTINGS_DOC, '配置', true);
  }
}
