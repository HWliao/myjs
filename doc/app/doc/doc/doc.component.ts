import { Component, OnInit } from '@angular/core';
import { DocListItemModel } from '../shared/doc-list-item.model';

@Component({
  selector: 'im-doc-doc',
  templateUrl: './doc.component.html',
  styleUrls: ['./doc.component.css']
})
export class DocComponent implements OnInit {

  items: DocListItemModel[];
  currItem: DocListItemModel;

  constructor() {
    this.currItem = new DocListItemModel(0, 'trending_up', '快速开始', '入门', true);
    this.currItem.desc = `
    /**
 * 列表项目
 * @author lhw
 */
export class DocListItemModel {
  constructor(id: number, icon: string, content: string, subHeader: string = null, needDivider = false) {
    this.id = id;
    this.needDivider = needDivider;
    this.subHeader = subHeader;
    this.icon = icon;
    this.content = content;
  }

  id: number;

  /**
   * 是否需要下划线结尾
   * @type {boolean}
   */
  needDivider = false;

  /**
   * 标题头
   */
  subHeader: string;

  /**
   * 图标
   */
  icon: string;

  /**
   * 内容
   */
  content: string;

  /**
   *
   */
  desc: string;
}

    `;
    this.items = [];
    this.items.push(new DocListItemModel(0, 'trending_up', '快速开始', '入门', true));
    this.items.push(new DocListItemModel(1, 'settings', '详细配置', '配置', true));
    this.items.push(new DocListItemModel(2, 'label', '登入', '方法'));
    this.items.push(new DocListItemModel(3, 'label', '登入'));
    this.items.push(new DocListItemModel(4, 'label', '登入'));
    this.items.push(new DocListItemModel(5, 'label', '登入'));
    this.items.push(new DocListItemModel(6, 'label', '登入'));
    this.items.push(new DocListItemModel(7, 'label', '登入'));
    this.items.push(new DocListItemModel(8, 'label', '登入'));
    this.items.push(new DocListItemModel(9, 'label', '登入'));
    this.items.push(new DocListItemModel(10, 'label', '登入'));
    this.items.push(new DocListItemModel(11, 'label', '登入'));
    this.items.push(new DocListItemModel(12, 'label', '登入'));
    this.items.push(new DocListItemModel(13, 'label', '登入'));
    this.items.push(new DocListItemModel(14, 'label', '登入'));
    this.items.push(new DocListItemModel(15, 'label', '登入'));
    this.items.push(new DocListItemModel(16, 'label', '登入'));
    this.items.push(new DocListItemModel(17, 'label', '登入'));
  }

  ngOnInit() {
  }

  onClickItem(item) {
    this.currItem = item;
  }
}
