import $ from 'jquery';

import { createDebug } from '../../utils/log';
import layoutHeml from './layout.html';
import { IS_LAYOUT_SHOW, IS_SIDEBAR_UP } from '../../model/state';

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
      this.update({
        isShow: this.store.get(IS_LAYOUT_SHOW),
        isSidebarUp: this.store.get(IS_SIDEBAR_UP),
      });
    });
  }

  init() {
    const id = `im-${new Date().getTime()}`;
    $(layoutHeml).addClass(this.className).attr('id', id).appendTo(document.body);
    this.$layout = $(`#${id}`);
    this.inited = true;
    log(`im layout ui inited,id:${id}`);
  }

  update(state) {
    log(`update state:%o,inited:${this.inited}`, state);
    if (!this.inited) return;
    this.showOrHide(state.isShow);
    this.upOrDown(state.isSidebarUp);
  }

  upOrDown(isUp) {
    if (this.isUp === isUp) return;
    log(`layout do up ${isUp}`);
    this.isUp = isUp;
    if (isUp) {
      this.$layout.removeClass('im-fold');
    } else {
      this.$layout.addClass('im-fold');
    }
  }

  showOrHide(isShow) {
    if (this.isShow === isShow) return;
    log(`layout show ${isShow}`);
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

  addAdditionalUI($e) {
    this.$layout.append($e);
  }
}
