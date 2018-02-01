/**
 * 列表项目
 * @author lhw
 */
export class DocListItemModel {
  constructor(id: number, icon: string, content: string, desc: string, subHeader: string = null, needDivider = false) {
    this.id = id;
    this.needDivider = needDivider;
    this.subHeader = subHeader;
    this.icon = icon;
    this.content = content;
    this.desc = desc;
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
