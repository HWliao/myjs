import EventEmitter from 'eventemitter3';
import $ from 'jquery';
import sidebarHtml from './sidebar.html';
import defaultImage from '../../../resource/images/default.png';
import { clearFlashing, flashing, sessionTime } from '../../utils/utils';
import { createDebug } from '../../utils/log';
import { SIDEBAR_HEADER_CLICK, SIDEBAR_LOGIN_BTN_CLICK, SIDEBAR_SESSION_CLICK } from '../../model/event';
import {
  IS_LOGIN,
  IS_SIDEBAR_UP,
  SDK_CURR_SESSION_ID,
  SDK_SESSION_TIME,
  SDK_SESSIONS,
  SDK_UPDATE_USER_TIME,
} from '../../model/state';

const log = createDebug('im:sidebar');

// 未登入
const SIDEBAR_CONTENT_NOLOGIN = 1;
// 没有sessions
const SIDEBAR_CONTENT_NOSESSION = 2;
// 有sessions
const SIDEBAR_CONTENT_LIST = 3;

// 侧边栏 未读总数 属性
const SIDEBAR_TOTAL_MSG_NUM_ATTR = 'data-unread';
// 侧边栏 未读总数 最大限制
const SIDEBAR_TOTAL_NUM_MAX = 99;

// li元素上的属性
const DATA_SESSION_ID = 'data-session-id';

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
    // 列表点击事件
    this.$sessionList.on('click', 'li', (e) => {
      const sessionId = $(e.currentTarget).attr(DATA_SESSION_ID);
      log('sidebar session list item click,sessionId:%s', sessionId);
      if (!sessionId) return;
      this.emit(SIDEBAR_SESSION_CLICK, sessionId);
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

    // 内容体部分展示
    this.renderSidebarContent();
  }

  /**
   * 渲染侧边栏内容区域
   */
  renderSidebarContent() {
    const isLogin = this.store.get(IS_LOGIN);
    const currSessionTime = this.store.get(SDK_SESSION_TIME);
    const userUpdateTime = this.store.get(SDK_UPDATE_USER_TIME);
    const updateTime = currSessionTime > userUpdateTime ? currSessionTime : userUpdateTime;
    const totalSessions = this.store.get(SDK_SESSIONS);
    const currSessionId = this.store.get(SDK_CURR_SESSION_ID);
    let type;
    if (!isLogin) {
      type = SIDEBAR_CONTENT_NOLOGIN;
    } else if (totalSessions.length === 0) {
      type = SIDEBAR_CONTENT_NOSESSION;
    } else {
      type = SIDEBAR_CONTENT_LIST;
    }

    // 已经处于未登入状态
    if (this.sdiebarContentType === type && type === SIDEBAR_CONTENT_NOLOGIN) return;
    // 未登入,显示登入页面
    if (type === SIDEBAR_CONTENT_NOLOGIN) {
      log('sidebar content to nologin.');
      this.sidebarContentType = type;
      this.switchSidebarContent(type);
      return;
    }

    // 已经处于无session页面
    if (this.sidebarContentType === type && type === SIDEBAR_CONTENT_NOSESSION) return;
    // 登入,无sessions
    if (type === SIDEBAR_CONTENT_NOSESSION) {
      log('sidebar content to nocontent');
      this.sidebarContentType = type;
      this.switchSidebarContent(type);
      return;
    }

    // sessions已经是最新的呢
    if (this.sidebarSessionTime >= updateTime) return;
    this.sidebarSessionTime = updateTime;
    // 登入有sessions
    log('sidebar content update sessions list');
    this.sidebarContentType = type;
    const lis = totalSessions
    // 根据sessionId读取session(这里的session并不是云信session对象,而是ui展示用的session对象)
      .map(sessionId => this.store.getSessionBySessionId(sessionId))
      .filter(session => !!session)
      // 根据session对象生成li html
      .reduce((html, session) => html + Sidebar.createSessionLi(session, currSessionId), '');
    this.$sessionList.html(lis);
    this.switchSidebarContent(type);
  }

  /**
   * 创建li元素
   * @param session
   * @param currentSessionId
   * @return {string}
   */
  static createSessionLi(session, currentSessionId) {
    const {
      sessionId,
      scene,
      to,
      unread = 0,
      nick = '',
      avatar = defaultImage,
      text = '',
      updateTime,
    } = session;
    return `
      <li class="jjsim-bd-item ${currentSessionId === sessionId ? 'current' : ' '}"
        data-scene="${scene}" 
        data-to="${to}" 
        ${DATA_SESSION_ID}="${sessionId}">
        <div class="jjsim-item-img">
          <img src="${avatar}"/>
        </div>
        <em class="num" title="${unread}" style="${unread ? 'visibility: visible;' : 'visibility: hidden;'}">${unread > 99 ? '...' : unread}</em>
        <span class="name" title="${nick}">${nick}</span>
        <span class="text" title="${text}">${text}</span>
        <span class="time" title="${sessionTime(updateTime)}">${sessionTime(updateTime)}</span>
      </li>`;
  }

  /**
   * 切换别表区域
   */
  switchSidebarContent(type = SIDEBAR_CONTENT_NOLOGIN) {
    switch (type) {
      case SIDEBAR_CONTENT_NOLOGIN:
        this.$nologin.show();
        this.$noagent.hide();
        this.$sessionList.hide();
        break;
      case SIDEBAR_CONTENT_NOSESSION:
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
