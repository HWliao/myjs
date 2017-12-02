import $ from 'jquery';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';

import NIM from '../../vender/nim-sdk/NIM_Web_NIM_v3.8.0';
import { createDebug } from '../utils/log';
import { isLayoutShow } from '../components/layout/layoutReducer';
import { isSidebarUp } from '../components/sidebar/sidebarReducer';
import {
  error,
  isLogin,
  isSdkConnected,
  sdkConnectCount, sdkCurrUpdateSessions,
  sdkDriverInfo,
  sdkLoginPorts,
  sdkMyInfo, sdkSessions,
  sdkSessionTime,
  sdkWillConnectInfo,
  userAccount,
  sdkSyncDone, sdkUpdateUserTime, sdkCurrUpdateUsers,
} from './reducer';
import {
  IS_LAYOUT_SHOW,
  IS_SIDEBAR_UP,
  IS_LOGIN,
  USER_ACCOUNT,
  IS_SDK_CONNECTED,
  SDK_CONNECT_COUNT,
  SDK_DRIVER_INFO,
  ERROR,
  SDK_WILL_CONNECT_INFO,
  SDK_LOGIN_PORTS,
  SDK_MY_INFO,
  SDK_SESSION_TIME,
  SDK_SESSIONS,
  SDK_CURR_UPDATE_SESSIONS,
  SDK_SYNC_DONE,
  SDK_UPDATE_USER_TIME,
  SDK_CURR_UPDATE_SUERS,
} from '../model/state';

const log = createDebug('im:store');

const middlewares = [thunkMiddleware];
if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line global-require
  middlewares.push(require('redux-logger').logger);
}

export class Store {
  // 按updateTime倒序排列
  sessions = [];
  // 以sessionId作为key
  sessionMap = {};
  // 以sessionid作为key,分组消息
  msgs = {};
  // 以idServer作为key
  msgMap = {};
  // 以accid作为key
  users = {};

  constructor() {
    log('store construct...');
    const initialState = {};
    const rootReducer = combineReducers({
      [IS_LAYOUT_SHOW]: isLayoutShow,
      [IS_SIDEBAR_UP]: isSidebarUp,
      [IS_LOGIN]: isLogin,
      [USER_ACCOUNT]: userAccount,
      [IS_SDK_CONNECTED]: isSdkConnected,
      [SDK_CONNECT_COUNT]: sdkConnectCount,
      [SDK_DRIVER_INFO]: sdkDriverInfo,
      [SDK_WILL_CONNECT_INFO]: sdkWillConnectInfo,
      [SDK_LOGIN_PORTS]: sdkLoginPorts,
      [SDK_MY_INFO]: sdkMyInfo,
      [SDK_SESSION_TIME]: sdkSessionTime,
      [SDK_SESSIONS]: sdkSessions,
      [SDK_CURR_UPDATE_SESSIONS]: sdkCurrUpdateSessions,
      [ERROR]: error,
      [SDK_SYNC_DONE]: sdkSyncDone,
      [SDK_UPDATE_USER_TIME]: sdkUpdateUserTime,
      [SDK_CURR_UPDATE_SUERS]: sdkCurrUpdateUsers,
    });
    log('rootRoducer %o', rootReducer);
    if (window.__REDUX_DEVTOOLS_EXTENSION__) {
      log('==== __REDUX_DEVTOOLS_EXTENSION__ ====');
      // 有redux开发工具,加载开发工具
      this.store = createStore(
        rootReducer,
        initialState,
        compose(
          applyMiddleware(...middlewares),
          window.__REDUX_DEVTOOLS_EXTENSION__(),
        ),
      );
    } else {
      this.store = createStore(rootReducer, initialState, applyMiddleware(...middlewares));
    }
  }

  dispatch(...args) {
    return this.store.dispatch(...args);
  }

  getState() {
    return this.store.getState();
  }

  subscribe(...args) {
    return this.store.subscribe(...args);
  }

  replaceReducer(...args) {
    return this.store.replaceReducer(...args);
  }

  get(key) {
    const value = this.store.getState()[key];
    if ($.isPlainObject(value)) {
      return Object.assign({}, value);
    } else if ($.isArray(value)) {
      return [].concat(value);
    }
    return value;
  }

  /**
   * 保存sessions,并且按updateTime倒序排列
   * @param sessions
   */
  putSessions(sessions = []) {
    this.sessions = NIM.util.mergeObjArray([], this.sessions, sessions, {
      sortPath: 'updateTime',
      desc: true,
    });
    sessions.forEach((session) => {
      this.sessionMap[session.id] = session;
    });
  }

  /**
   * 获取总的sessionids
   * @return {Array}
   */
  getTotalSessionIds() {
    return this.sessions.map(session => session.id);
  }

  /**
   * 根据sessionid获取session
   * @param sessionId
   * @return {{}}
   */
  getSessionBySessionId(sessionId) {
    return this.sessionMap[sessionId];
  }

  /**
   * 获取所有的会话
   * @return {Array.<*>}
   */
  getTotalSessions() {
    return [].concat(this.sessions);
  }

  /**
   * 传递进来的消息,倒序去重
   * @param msgs
   */
  putMsgs(msgs = []) {
    NIM.util.mergeObjArray([], [], msgs, {
      keyPath: 'idClient',
      sortPath: 'time',
      desc: true,
    }).forEach((msg) => {
      this.msgMap[msg.idServer] = msg;
      const sessionMsgs = this.msgs[msg.sessionId] || [];
      sessionMsgs.push(msg);
      this.msgs[msg.sessionId] = sessionMsgs;
    });
  }

  /**
   * 获取session对应的消息
   * @param sessionId
   * @return {Array.<*>}
   */
  getMsgsBySessionId(sessionId) {
    return [].concat(this.msgs[sessionId]);
  }

  /**
   * 根据idServer获取msg
   * @param idServer
   * @return {*}
   */
  getMsgByIdServer(idServer) {
    return this.msgMap[idServer];
  }

  /**
   * 根据accid查询user
   * @param accid
   * @return {*}
   */
  getUserById(accid) {
    return this.users[accid];
  }

  /**
   * putusers
   * @param users
   */
  putUsers(users = []) {
    users.forEach((user) => {
      this.users[user.accid] = user;
    });
  }
}
