/* eslint-disable import/first */
import './public-path';
import EventEmiiter from 'eventemitter3';

import '../resource/css/im.css';

import { createDebug, setEnabled } from './utils/log';
import { Store } from './store/store';
import { getConfig } from './config';
import { Sdk } from './sdk';
import { Layout } from './components/layout/layout';
import { hideLayout, showLayout } from './components/layout/layoutAction';
import { Sidebar } from './components/sidebar/sidebar';
import { ChatPanel } from './components/chatPanel/chat-panel';
import {
  CHAT_PANEL_CLOSE_BTN_CLICK, CHAT_PANEL_IMAGE_SEND, CHAT_PANEL_SEND_BTN_CLICK, CHAT_PANEL_STICKERS,
  IM_TO_CONSULTING,
  IM_TO_LOGIN,
  SIDEBAR_HEADER_CLICK,
  SIDEBAR_LOGIN_BTN_CLICK,
  SIDEBAR_SESSION_CLICK,
} from './model/event';
import { sideUpOrDown } from './components/sidebar/sidebarAction';
import { IS_LOGIN, IS_SIDEBAR_UP, SDK_CURR_SESSION_ID } from './model/state';
import { login, logout } from './store/action';
import { createError, IS_LOGINED, NOT_LOGIN } from './model/error';
import { prefixInteger } from './utils/utils';

const log = createDebug('im:main');

export default class Im extends EventEmiiter {
  constructor(options = {}) {
    super();
    // 1.配置日志
    setEnabled(options.debug);

    log('im contruct...');
    // 2.初始配置项,静态配置项,不可改变
    this.options = getConfig(options);

    // new store 负责所有数据的存储以及应用状态变化
    this.store = new Store(this.options);
    // new sdk 应用接口,包含云信接口以及外部接口调用
    this.sdk = new Sdk(this.options, this.store);
    // new layout 应用ui整体结构
    this.layout = new Layout(this.options, this.store);
    // new sidebar
    this.sidebar = new Sidebar(this.options, this.layout, this.store);
    // new chatPanel
    this.chatPanel = new ChatPanel(this.options, this.layout, this.store);

    // 显示layout ui
    this.store.dispatch(showLayout());

    // 初始化绑定事件相关
    this.initEvent();
  }

  initEvent() {
    // 侧边栏头部被点击
    this.sidebar.on(SIDEBAR_HEADER_CLICK, () => {
      log('main on SIDEBAR_HEADER_CLICK');
      // 改变 收起/展开 状态
      const currIsUp = this.store.get(IS_SIDEBAR_UP);
      const currSessionId = this.store.get(SDK_CURR_SESSION_ID);
      log(`main change size up/down. ${!currIsUp}`);
      this.store.dispatch(sideUpOrDown(!currIsUp));

      if (currSessionId && !currIsUp) {
        this.sdk.setCurrSession(currSessionId);
      } else if (currSessionId && currIsUp) {
        this.sdk.resetCurrSessionJustNim(currSessionId);
      }

      // 登入状态发起咨询
      if (this.store.get(IS_LOGIN)) {
        log('main emit IM_TO_CONSULTING');
        this.emit(IM_TO_CONSULTING);
      }
    });

    // 登入按钮点击处理
    this.sidebar.on(SIDEBAR_LOGIN_BTN_CLICK, () => {
      // 未登入发起登入
      if (!this.store.get(IS_LOGIN)) {
        this.emit(IM_TO_LOGIN);
      }
    });

    // session被点击
    this.sidebar.on(SIDEBAR_SESSION_CLICK, (sessionId) => {
      if (sessionId === this.store.get(SDK_CURR_SESSION_ID)) return;
      this.sdk.setCurrSession(sessionId);
    });

    // 聊天面板关闭按钮点击
    this.chatPanel.on(CHAT_PANEL_CLOSE_BTN_CLICK, (sessionId) => {
      if (sessionId !== this.store.get(SDK_CURR_SESSION_ID)) return;
      this.sdk.resetCurrSession(sessionId);
    });

    // 发送按钮点击
    this.chatPanel.on(CHAT_PANEL_SEND_BTN_CLICK, (text, sessionId) => {
      const session = this.store.getSessionBySessionId(sessionId);
      if (!session) return;
      this.sdk.sendTextMsg(text, session.scene, session.to);
    });

    // 发送图片
    this.chatPanel.on(CHAT_PANEL_IMAGE_SEND, (file, sessionId) => {
      const session = this.store.getSessionBySessionId(sessionId);
      if (!session) return;
      this.sdk.sendImage(file, session.scene, session.to);
    });

    // 发送贴图
    this.chatPanel.on(CHAT_PANEL_STICKERS, ({ category, emoji }, sessionId) => {
      if (!sessionId || !category || !emoji) return;
      const session = this.store.getSessionBySessionId(sessionId);
      if (!session) return;

      this.sdk.sendCustomMessage({
        type: 3,
        data: {
          catalog: category,
          chartlet: `${category}${prefixInteger(Number(emoji), 3)}`,
        },
      }, session.scene, session.to);
    });
  }

  /**
   * 显示/隐藏 主体框架
   * @param flag
   */
  show(flag = true) {
    if (flag) {
      this.store.dispatch(showLayout());
    } else {
      this.store.dispatch(hideLayout());
    }
  }

  /**
   * 登入
   * @param accid
   * @param password
   * @return {*}
   */
  login(accid, password) {
    log('im login accid:%s,pasword:%s', accid, password);
    if (this.store.get(IS_LOGIN)) return;
    // im login
    log('isLogin state set to true');
    this.store.dispatch(login({ accid, password }));
    // sdk connect
    this.sdk.connect(accid, password);
  }

  logout() {
    log('im logout');
    if (!this.store.get(IS_LOGIN)) return Promise.reject(createError(NOT_LOGIN));
    this.sdk.disconnect();
    log('isLogin state set false');
    this.store.dispatch(logout());
    return Promise.resolve();
  }

  // 事件类型
  static event = {
    IM_TO_LOGIN,
    IM_TO_CONSULTING,
  };

  static errorCode = {
    IS_LOGINED,
    NOT_LOGIN,
  };
}
