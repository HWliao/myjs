import { Injectable } from '@angular/core';
import { DocListItemModel } from './doc-list-item.model';

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
    })
    .catch((err)=>{
      // 处理创建组件时的错误,一般不会发生
    })
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
      this.items.push(this.generateMethodModel('初始化', ImDocService.IM_INIT, '方法', true));
      this.items.push(this.generateMethodModel('登出', ImDocService.LOGOUT_DOC));
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
