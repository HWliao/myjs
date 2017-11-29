import $ from 'jquery';

import { createDebug } from '../../utils/log';
import layoutHeml from './layout.html';

const log = createDebug('im:layout');

/**
 * im 整体容器,框架
 */
export class Layout {
  constructor(options, store) {
    log(`layout construct,className:${options.className}`);
    this.store = store;
    this.className = options.className;

    // 初始化ui
    this.init();
    // 监听状态变化
    this.store.subscribe(() => {
      const state = this.store.getState();
      this.update(state.get('isLayoutShow'));
    });
  }

  init() {
    const id = `im-${new Date().getTime()}`;
    $(layoutHeml).addClass(this.className).attr('id', id).appendTo(document.body);
    this.$layout = $(`#${id}`);
    this.inited = true;
    this.update(false);
    log(`im layout ui inited,id:${id}`);
  }

  update(isShow) {
    log(`update isShow:${isShow},inited:${this.inited}`);
    if (!this.inited) return;
    if (this.isShow === isShow) return;
    log('do update.');
    this.isShow = isShow;
    if (isShow) {
      this.$layout.show();
    } else {
      this.$layout.hide();
    }
  }

  addUI($e) {
    this.$layout.find('#im-content').append($e);
  }
}
