/* eslint-disable import/first */
import './public-path';
import EventEmiiter from 'eventemitter3';
import $ from 'jquery';
import Nim from '../vender/nim-sdk/NIM_Web_NIM_v3.8.0';

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
  CHAT_PANEL_CLOSE_BTN_CLICK,
  CHAT_PANEL_IMAGE_SEND,
  CHAT_PANEL_SEND_BTN_CLICK,
  CHAT_PANEL_STICKERS,
  IM_MSG,
  IM_TO_UP,
  IM_TO_LOGIN,
  SIDEBAR_HEADER_CLICK,
  SIDEBAR_LOGIN_BTN_CLICK,
  SIDEBAR_SESSION_CLICK, IM_ERROR,
} from './model/event';
import { sideUpOrDown } from './components/sidebar/sidebarAction';
import {
  ERROR, IS_LAYOUT_SHOW,
  IS_LOGIN,
  IS_SDK_CONNECTED,
  IS_SIDEBAR_UP,
  SDK_CURR_MSG_ID_CLIENT,
  SDK_CURR_MSG_TIME,
  SDK_CURR_SESSION_ID,
  USER_ACCOUNT,
} from './model/state';
import { login, logout, sdkGotoConsultative, sdkGotoConsultativeFail } from './store/action';
import { createError, IS_LOGINED, NOT_LOGIN } from './model/error';
import { prefixInteger } from './utils/utils';
import { SCENE_P2P, SCENE_TEAM } from './model/constant';

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
        this.sdk.setCurrSession(currSessionId, true);
      } else if (currSessionId && currIsUp) {
        this.sdk.resetCurrSessionJustNim(currSessionId);
      }

      // 登入状态发起咨询
      if (this.store.get(IS_LOGIN)) {
        log('main emit IM_TO_CONSULTING');
        this.emit(IM_TO_UP);
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

    // 监听store变化
    let msgUpdateTime = +new Date();
    let errorTime = +new Date();
    this.store.subscribe(() => {
      const currMsgTime = this.store.get(SDK_CURR_MSG_TIME);
      const msgIdClient = this.store.get(SDK_CURR_MSG_ID_CLIENT);
      if (currMsgTime > msgUpdateTime) {
        msgUpdateTime = currMsgTime;
        const msg = this.store.getMsgByIdClient(msgIdClient);
        let content = {};
        if (msg.type === 'custom') {
          try {
            content = JSON.parse(msg.content);
          } catch (e) {
            console.error(e);
          }
        }
        log('emit IM_MSG custom:%o,msg:%o', content, msg);
        this.emit(IM_MSG, content, Object.assign({}, msg));
      }

      const error = this.store.get(ERROR);
      if (error && error.time > errorTime) {
        log('emit IM_ERROR %o', error);
        errorTime = error.time;
        this.emit(IM_ERROR, error);
      }
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

    const userAccount = this.store.get(USER_ACCOUNT) || {};
    // im login
    log('isLogin state set to true');
    if (!userAccount.accid) this.store.dispatch(login({ accid, password }));
    // sdk connect
    this.sdk.connect();
  }

  logout() {
    log('im logout');
    if (!this.store.get(IS_LOGIN)) return Promise.reject(createError(NOT_LOGIN));
    this.sdk.disconnect();
    log('isLogin state set false');
    this.store.dispatch(logout());
    return Promise.resolve();
  }

  gotoConsultative(data) {
    if (!this.isLogin()) return;
    log('go to consultative state %o', data);
    this.store.dispatch(sdkGotoConsultative(data));
    this.sdk.resetCurrSessionJustNim(this.store.get(SDK_CURR_SESSION_ID));
  }

  gotoConsultativeFail(data) {
    if (!this.isLogin()) return;
    log('go to consultative fail state %o', data);
    this.store.dispatch(sdkGotoConsultativeFail(data));
    this.sdk.resetCurrSessionJustNim(this.store.get(SDK_CURR_SESSION_ID));
  }

  isLogin() {
    return this.store.get(IS_LOGIN);
  }

  isConnect() {
    return this.store.get(IS_SDK_CONNECTED);
  }

  isShow() {
    return this.store.get(IS_LAYOUT_SHOW);
  }

  isUp() {
    return this.store.get(IS_SIDEBAR_UP);
  }

  /**
   * 发送文本消息
   * @param scene 场景
   * @param to 发给谁
   * @param text 文本
   * @return {Promise.<T>}
   */
  sendTextMessage(scene, to, text) {
    if (!this.isConnect()) {
      return Promise.reject(new Error('连接未建立'));
    }
    if (scene !== SCENE_P2P && scene !== SCENE_TEAM) {
      return Promise.reject(new Error('scene 只能是p2p/team'));
    }
    if (!to) {
      return Promise.reject(new Error('to 不能为空'));
    }
    if (typeof text !== 'string') {
      return Promise.reject(new Error('text 只能是String'));
    }
    return this.sdk.sendTextMsg(text, scene, to);
  }

  /**
   * 发送自定义消息
   * @param scene 场景
   * @param to 发给谁
   * @param content 内容
   * @param pushContent 推送内容 字符串,一般为 [房源] [贴图] 这种格式
   * @return {Promise}
   */
  sendCustomMessage(scene, to, content, pushContent) {
    if (!this.isConnect()) {
      return Promise.reject(new Error('连接未建立'));
    }
    if (scene !== SCENE_P2P && scene !== SCENE_TEAM) {
      return Promise.reject(new Error('scene 只能是p2p/team'));
    }
    if (!to) {
      return Promise.reject(new Error('to 不能为空'));
    }
    if (typeof pushContent !== 'string') {
      return Promise.reject(new Error('text 只能是String'));
    }
    if ($.isEmptyObject(content)) {
      return Promise.reject(new Error('content 只能是普通对象,且不能为空'));
    }
    return this.sdk.sendCustomMessage(content, scene, to, pushContent);
  }

  setCurrSession(scene, to) {
    if (!this.isConnect()) {
      return Promise.reject(new Error('连接未建立'));
    }
    if (scene !== SCENE_P2P && scene !== SCENE_TEAM) {
      return Promise.reject(new Error('scene 只能是p2p/team'));
    }
    if (!to) {
      return Promise.reject(new Error('to 不能为空'));
    }
    this.sdk.setCurrSession(`${scene}-${to}`, false);
    return Promise.resolve();
  }

  destroy() {
    this.sdk.disconnect();
    this.layout.remove();
    this.sdk = null;
    this.store = null;
    this.layout = null;
    this.sidebar = null;
    this.chatPanel = null;
  }

  // 事件类型
  static event = {
    IM_TO_LOGIN,
    IM_TO_UP,
    IM_MSG,
    IM_ERROR,
  };

  static errorCode = {
    IS_LOGINED,
    NOT_LOGIN,
  };

  static constant = {
    SCENE_TEAM,
    SCENE_P2P,
  };

  static getPlatform() {
    return Object.assign({}, Nim.platform);
  }
}
