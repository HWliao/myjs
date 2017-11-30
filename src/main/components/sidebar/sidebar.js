import EventEmitter from 'eventemitter3';
import $ from 'jquery';
import sidebarHtml from './sidebar.html';
import { createDebug } from '../../utils/log';
import { SIDEBAR_HEADER_CLICK, SIDEBAR_LOGIN_BTN_CLICK } from '../../model/event';
import { IS_LOGIN, IS_SIDEBAR_UP } from '../../model/state';

const log = createDebug('im:sidebar');

// 未登入
const SIDEBAR_CONTENT_NOLOGIN = 1;
// 没有sessions
const SIDEBAR_CONTENT_NOAGENT = 2;
// 有sessions
const SIDEBAR_CONTENT_LIST = 3;

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
    this.initEvent();

    this.inited = true;
    // 监听状态变化
    this.store.subscribe(() => {
      log('listening store change');
      this.update({
        isLogin: this.store.get(IS_LOGIN),
        isSidebarUp: this.store.get(IS_SIDEBAR_UP),
      });
    });
  }

  initEvent() {
    // 头部点击事件
    this.$header.on('click', () => {
      log('sidebar header emit click');
      this.emit(SIDEBAR_HEADER_CLICK);
    });
    // 登入按钮的点击
    this.$loginBtn.on('click', () => {
      log('sidebar loginBtn emit click');
      this.emit(SIDEBAR_LOGIN_BTN_CLICK);
    });
  }

  init() {
    log('sidebar init');
    this.$sidebar = $(sidebarHtml);
    this.layout.addUI(this.$sidebar);
    log(`init sidebar title ${this.options.sidebarTitle}`);
    this.$sidebar.find('.im-title').text(this.options.sidebarTitle);

    this.$header = this.$sidebar.find('.jjsim-hd');
    this.$totalMsgNum = this.$sidebar.find('.jjsim-hd-num');
    this.$msgIcon = this.$sidebar.find('.im-icon');
    this.$toggleBtn = this.$sidebar.find('.jjsim-hd-closebtn');

    this.$nologin = this.$sidebar.find('#jjsim-nologin');
    this.$nologin.find('p').text(this.options.nologinTitle);
    this.$loginBtn = this.$nologin.find('a.loginbtn');
    this.$loginBtn.text(this.options.loginBtnTitle);

    this.$noagent = this.$sidebar.find('#jjsim-noagent');
    this.$noagent.find('p').text(this.options.noagentTitle);

    this.$sessionList = this.$sidebar.find('#jjsim-list');
  }

  update(state) {
    log('update sidebar,%o', state);
    if (!this.inited) return;
    if (!state.isLogin && !state.isSidebarUp) {
      // 未登入,且收起侧边栏
      log(`sidebar isLogin:${state.isLogin},isSidebarUp:${state.isSidebarUp}`);
      this.showUnreadMsgTotalNum(0);
      this.shakeUnreadMsgTotalNum(false);
      this.toggleSidebarHeader(false);
      this.switchSidebarContent(SIDEBAR_CONTENT_NOLOGIN);
    } else if (!state.isLogin && state.isSidebarUp) {
      // 未登入,且收起侧边栏
      log(`sidebar isLogin:${state.isLogin},isSidebarUp:${state.isSidebarUp}`);
      this.showUnreadMsgTotalNum(0);
      this.shakeUnreadMsgTotalNum(false);
      this.toggleSidebarHeader(true);
      this.switchSidebarContent(SIDEBAR_CONTENT_NOLOGIN);
    } else {
      // todo
      log('sidebar update todo');
    }
  }

  switchSidebarContent(type = SIDEBAR_CONTENT_NOLOGIN) {
    if (this.sdiebarContentType === SIDEBAR_CONTENT_NOLOGIN) return;
    log(`switchSidebarContent type ${type}`);
    this.sdiebarContentType = type;
    switch (type) {
      case SIDEBAR_CONTENT_NOLOGIN:
        this.$nologin.show();
        this.$noagent.hide();
        this.$sessionList.hide();
        break;
      case SIDEBAR_CONTENT_NOAGENT:
        this.$nologin.hide();
        this.$noagent.show();
        this.$sessionList.hide();
        break;
      case SIDEBAR_CONTENT_LIST:
        this.$nologin.hide();
        this.$noagent.hide();
        this.$sessionList.show();
        break;
      default:
        this.$nologin.show();
        this.$noagent.hide();
        this.$sessionList.hide();
    }
  }

  showUnreadMsgTotalNum(num) {
    log('show total unread msg num:%i', num);
    if (this.totalNum === num) return;
    this.totalNum = num;
    this.$totalMsgNum.text(num);
    if (num) {
      this.$totalMsgNum.show();
    } else {
      this.$totalMsgNum.hide();
    }
  }

  shakeUnreadMsgTotalNum(flag) {
    if (this.isShaking === flag) return;
    this.isShaking = flag;
    if (flag) {
      // todo
      log('add shake');
    } else {
      log('remove shake');
    }
  }

  toggleSidebarHeader(flag) {
    if (this.isUp === flag) return;
    this.isUp = flag;
    if (flag) {
      this.$toggleBtn.attr('title', this.options.sidebarUpTip);
      log(`sidebar do up.${this.options.sidebarUpTip}`);
    } else {
      this.$toggleBtn.attr('title', this.options.sidebarDownTip);
      log(`sidebar do up.${this.options.sidebarDownTip}`);
    }
  }
}
