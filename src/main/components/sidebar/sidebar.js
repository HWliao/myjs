import EventEmitter from 'eventemitter3';
import $ from 'jquery';
import sidebarHtml from './sidebar.html';
import { createDebug } from '../../utils/log';

const log = createDebug('im:sidebar');

export class Sidebar extends EventEmitter {
  constructor(options, layout, store) {
    super();
    log('sidebar construct...');
    this.store = store;
    this.options = options;
    this.layout = layout;
    // 初始化ui
    this.init(layout, options);
    // 时间监听
//    this.initEvent();
    // 监听状态变化
    this.store.subscribe(() => {
      log('listening store change');
    });
  }

  init() {
    log('sidebar init');
    this.$sidebar = $(sidebarHtml);
    this.layout.addUI(this.$sidebar);
    log(`init sidebar title ${this.options.sidebarTitle}`);
    this.$sidebar.find('.im-title').text(this.options.sidebarTitle);
    this.$totalMsgNum = this.$sidebar.find('.jjsim-hd-num');
    this.$msgIcon = this.$sidebar.find('.im-icon');
    this.$toggleBtn = this.$sidebar.find('.jjsim-hd-closebtn');

    this.inited = true;
    this.update({
      isLogin: false,
      isSidebarUp: false,
    });
  }

  update(state) {
    log('update sidebar,%o', state);
    if (!this.inited) return;
    if (!state.isLogin && !state.isSidebarUp) {
      // 未登入,且收起侧边栏
      log(`sidebar isLogin:${state.isLogin},isSidebarUp:${state.isSidebarUp}`);
      this.showUnreadMsgTotalNum(0);
      this.shakeUnreadMsgTotalNum(false);
      this.toggleSidebar(false);
    } else {
      log('sidebar update todo');
    }
  }

  showUnreadMsgTotalNum(num) {
    log('show total unread msg num:%i', num);
    this.$totalMsgNum.text(num);
    if (num) {
      this.$totalMsgNum.show();
    } else {
      this.$totalMsgNum.hide();
    }
  }

  shakeUnreadMsgTotalNum(flag) {
    if (flag) {
      log('add shake');
      this.$msgIcon.addClass('shake');
    } else {
      log('remove shake');
      this.$msgIcon.removeClass('shake');
    }
  }

  toggleSidebar(flag) {
    if (flag) {
      // 按钮
      this.$toggleBtn
        .attr('title', this.options.sidebarUpTip)
        .removeClass('sprite-down')
        .addClass('sprite-up');
    } else {
      // 按钮
      this.$toggleBtn
        .attr('title', this.options.sidebarDownTip)
        .removeClass('sprite-up')
        .addClass('sprite-down');
    }
  }
}
