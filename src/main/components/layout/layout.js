import $ from 'jquery';
import EventEmitter from 'eventemitter3';

import { createDebug } from '../../utils/log';
import layoutHeml from './layout.html';
import { IS_LAYOUT_SHOW, IS_SDK_KICKED, IS_SIDEBAR_UP } from '../../model/state';
import { dateFormat } from '../../utils/utils';
import { LAYOUT_RE_LOGIN_BTN } from '../../model/event';

const log = createDebug('im:layout');

/**
 * im 整体容器,框架
 */
export class Layout extends EventEmitter {
  constructor(options, store) {
    super();
    log(`layout construct,className:${options.className}`);
    this.store = store;
    this.className = options.className;

    // 初始化ui
    this.init();
    // 监听事件
    this.initEvent();
    // 监听状态变化
    this.store.subscribe(() => {
      this.update({
        isShow: this.store.get(IS_LAYOUT_SHOW),
        isSidebarUp: this.store.get(IS_SIDEBAR_UP),
        isKicked: this.store.get(IS_SDK_KICKED),
      });
    });
  }

  init() {
    const id = `im-${new Date().getTime()}`;
    $(layoutHeml).addClass(this.className).attr('id', id).appendTo(document.body);
    this.$layout = $(`#${id}`);
    this.$tip = this.$layout.find('#im-promp');
    this.showTip(false);
    this.inited = true;
    log(`im layout ui inited,id:${id}`);
  }

  initEvent() {
    // 重新连接
    this.$tip.on('click', () => {
      this.showTip(false);
      this.emit(LAYOUT_RE_LOGIN_BTN);
    });
    // 取消
    this.$tip.on('click', () => {
      this.showTip(false);
    });
  }

  update(state) {
    log(`update state:%o,inited:${this.inited}`, state);
    if (!this.inited) return;
    this.showOrHide(state.isShow);
    this.upOrDown(state.isSidebarUp);
    this.showTip(state.isKicked);
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

  remove() {
    this.$layout.remove();
  }

  showTip(toShow = false) {
    this.$tip.find('.promp-content').html(`您的账号由于咨询操作过于频繁，<br>已于${dateFormat(new Date(), 'HH:mm')}分被迫下线`);
    if (toShow) {
      this.$tip.show();
    } else {
      this.$tip.hide();
    }
  }
}
