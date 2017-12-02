import EventEmitter from 'eventemitter3';
import $ from 'jquery';
import sidebarHtml from './sidebar.html';
import { clearFlashing, flashing } from '../../utils/utils';
import { createDebug } from '../../utils/log';
import { SIDEBAR_HEADER_CLICK, SIDEBAR_LOGIN_BTN_CLICK } from '../../model/event';
import { IS_LOGIN, IS_SIDEBAR_UP, SDK_SESSIONS } from '../../model/state';

const log = createDebug('im:sidebar');

// 未登入
const SIDEBAR_CONTENT_NOLOGIN = 1;
// 没有sessions
const SIDEBAR_CONTENT_NOAGENT = 2;
// 有sessions
const SIDEBAR_CONTENT_LIST = 3;

// 侧边栏 未读总数 属性
const SIDEBAR_TOTAL_MSG_NUM_ATTR = 'data-unread';
// 侧边栏 未读总数 最大限制
const SIDEBAR_TOTAL_NUM_MAX = 99;

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
      this.update();
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
    this.$msgIcon = this.$sidebar.find('.jjsim-icon');
    this.$toggleBtn = this.$sidebar.find('.jjsim-hd-closebtn');

    this.$nologin = this.$sidebar.find('#jjsim-nologin');
    this.$nologin.find('p').text(this.options.nologinTitle);
    this.$loginBtn = this.$nologin.find('a.loginbtn');
    this.$loginBtn.text(this.options.loginBtnTitle);

    this.$noagent = this.$sidebar.find('#jjsim-noagent');
    this.$noagent.find('p').text(this.options.noagentTitle);

    this.$sessionList = this.$sidebar.find('#jjsim-list');
  }

  update() {
    log('update sidebar');
    if (!this.inited) return;

    // 展开收起 与登入与否无关
    this.toggleSidebarHeader();

    // 未读数量(闪烁)
    this.showUnreadMsgTotalNum();

    this.switchSidebarContent(SIDEBAR_CONTENT_NOLOGIN);
  }

  /**
   *
   * @param type
   */
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

  /**
   * 总未读数,展示,闪烁
   */
  showUnreadMsgTotalNum() {
    const isLogin = this.store.get(IS_LOGIN);

    if (!isLogin) {
      log('not login don\'t show msg total num');
      // 未登入,不显示数量,不闪烁
      this.$totalMsgNum.hide();
      this.$totalMsgNum.attr(SIDEBAR_TOTAL_MSG_NUM_ATTR, 0);
      this.$totalMsgNum.text(0);
      clearFlashing(this.flashingDevice);
      return;
    }

    // 侧边栏状态
    const isSidebarUp = this.store.get(IS_SIDEBAR_UP);
    // 当前UI未读数
    const totalCurrUnread = parseInt(this.$totalMsgNum.attr(SIDEBAR_TOTAL_MSG_NUM_ATTR), 10) || 0;
    // 总sessionid
    const totalSessionIds = this.store.get(SDK_SESSIONS);
    // 当前store总未读数
    const totalMsgNum = totalSessionIds.reduce((sum, sessionId) => {
      const session = this.store.getSessionBySessionId(sessionId) || {};
      return sum + (session.unread || 0);
    }, 0);

    if (totalMsgNum === 0) {
      // 未读数量为0,不展示,不闪动
      log('there is no unread msg.');
      // 没有未读数
      this.$totalMsgNum.hide();
      this.$totalMsgNum.attr(SIDEBAR_TOTAL_MSG_NUM_ATTR, totalMsgNum);
      this.$totalMsgNum.text(totalMsgNum);
      clearFlashing(this.flashingDevice);
      return;
    }

    if (totalMsgNum !== totalCurrUnread) {
      this.$totalMsgNum.attr(SIDEBAR_TOTAL_MSG_NUM_ATTR, totalMsgNum);
      this.$totalMsgNum.text(totalMsgNum > SIDEBAR_TOTAL_NUM_MAX ? `${SIDEBAR_TOTAL_NUM_MAX}+` : totalMsgNum);
      this.$totalMsgNum.show();
    }

    if (isSidebarUp) {
      // 展开 不需要闪动
      clearFlashing(this.flashingDevice);
    } else if (totalMsgNum > totalCurrUnread) {
      // 当未读数增加的时候进行闪动
      this.flashingDevice = flashing(this.$msgIcon, 500);
    }
  }

  /**
   * 侧边栏张开收起
   */
  toggleSidebarHeader() {
    const isSidebarUp = this.store.get(IS_SIDEBAR_UP);
    if (this.isUp === isSidebarUp) return;
    log('sidebar toggle %o', isSidebarUp);
    this.isUp = isSidebarUp;
    if (isSidebarUp) {
      this.$toggleBtn.attr('title', this.options.sidebarUpTip);
      log(`sidebar do up.${this.options.sidebarUpTip}`);
    } else {
      this.$toggleBtn.attr('title', this.options.sidebarDownTip);
      log(`sidebar do down.${this.options.sidebarDownTip}`);
    }
  }
}
