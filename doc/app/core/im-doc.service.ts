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

  /**
   * 配置文档
   * @type {string}
   */
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
      this.items.push(this.generateMethodModel('登入', ImDocService.LOGIN_DOC, '方法', true));
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
