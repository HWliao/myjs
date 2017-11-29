import $ from 'jquery';

import { createDebug } from '../../utils/log';
import layoutHeml from './layout.html';

const log = createDebug('im:layout');

export const LAYOUT_DATA_STATE = 'data-state';

export class Layout {
  constructor(options, store) {
    log(`layout construct,className:${options.className}`);
    if (!store) {
      throw new Error('the stor can not be null/undefined.');
    }
    this.store = store;
    this.className = options.className;

    // 初始化ui
    this.init();
    // 监听状态变化
    this.store.subscribe(() => {
      const state = this.store.getState();
      this.update(state.layout);
    });
  }

  init() {
    const id = `im-${new Date().getTime()}`;
    $(layoutHeml).addClass(this.className).attr('id', id).appendTo(document.body);
    this.$layout = $(`#${id}`);
    this.inited = true;
    log(`im layout ui inited,id:${id}`);
  }

  update(attr) {
    log(`update attr:${attr},inited:${this.inited}`);
    if (!this.inited) return;
    this.$layout.attr(LAYOUT_DATA_STATE, attr);
  }
}
