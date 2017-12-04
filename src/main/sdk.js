import EventEmitter from 'eventemitter3';
import $ from 'jquery';

import NIM from '../vender/nim-sdk/NIM_Web_NIM_v3.8.0';
import { createDebug } from './utils/log';
import { SDK_CONNECT_COUNT, USER_ACCOUNT } from './model/state';
import {
  error,
  sdkConnected,
  sdkDisconnected,
  sdkLoginPortsChange, sdkSyncDeon,
  sdkUpdateMyInfo,
  sdkUpdateSessions, sdkUpdateUser,
  sdkWillConnect,
} from './store/action';
import { SCENE_P2P } from './model/constant';

const log = createDebug('im:sdk');

export class Sdk extends EventEmitter {
  constructor(options, store) {
    super();
    log('sdk construct... options:%o', options);
    this.options = this.getOptions(options);
    this.store = store;

    this.getUsersFromOptions = options.getUsers;
  }

  /**
   * 连接
   * @return {Promise.<T>}
   */
  connect() {
    const { accid, password } = this.store.get(USER_ACCOUNT);
    const options = Object.assign({}, this.options, { account: accid, token: password });
    this.nim = NIM.getInstance(options);
  }

  disconnect() {
    log('sdk disconnect');
    if (this.nim) this.nim.disconnect();
  }

  /**
   * 获取配置
   * @param options
   * @return *
   */
  getOptions(options = {}) {
    return {
      debug: options.thirdPartyDebug || false,
      secure: true,
      appKey: options.appKey,
      account: '',
      token: '',
      onconnect: this.onconnect.bind(this),
      onwillreconnect: this.onwillreconnect.bind(this),
      ondisconnect: this.ondisconnect.bind(this),
      onerror: this.onerror.bind(this),
      onloginportschange: this.onloginportschange.bind(this),
      syncRelations: false,
      syncFriends: false,
      onmyinfo: this.onmyinfo.bind(this),
      onupdatemyinfo: this.onupdatemyinfo.bind(this),
      syncFriendUsers: false,
      syncTeams: false,
      syncExtraTeamInfo: false,
      syncTeamMembers: false,
      syncSessionUnread: true,
      onsessions: this.onsessions.bind(this),
      onupdatesession: this.onupdatesession.bind(this),
      syncRoamingMsgs: true,
      onroamingmsgs: this.onroamingmsgs.bind(this),
      onofflinemsgs: this.onofflinemsgs.bind(this),
      onmsg: this.onmsg.bind(this),
      syncMsgReceipts: true,
      onsyncdone: this.onsyncdone.bind(this),
      autoMarkRead: true,
      db: false,
    };
  }

  /**
   * 连接成功回调
   */
  onconnect(driverInfo) {
    const connectNum = this.store.get(SDK_CONNECT_COUNT);
    log('sdk connect %d', connectNum);
    this.store.dispatch(sdkConnected({ count: connectNum + 1, driverInfo }));
  }

  /**
   * 重新连接回调
   */
  onwillreconnect(obj) {
    log('sdk reconnect %o', obj);
    if (obj) {
      this.store.dispatch(sdkWillConnect(obj));
    }
  }

  /**
   * 断开连接回调
   */
  ondisconnect(obj) {
    log('sdk disconnect %o', obj);
    this.store.dispatch(sdkDisconnected());
    if (obj && obj.code) {
      log('sdk disconnect with error %o', obj);
      this.store.dispatch(error({ code: obj.code, message: obj.message }));
    }
  }

  /**
   * 错误回调
   */
  onerror(e) {
    log('sdk error %o', e);
    if (e) {
      this.store.dispatch(error(e));
    }
  }

  /**
   * 多端登录状态变化的回调
   */
  onloginportschange(loginPorts = []) {
    log('sdk loginportschange %o', loginPorts);
    if ($.isArray(loginPorts)) {
      this.store.dispatch(sdkLoginPortsChange(loginPorts));
    }
  }

  /**
   * 同步登录用户名片的回调
   */
  onmyinfo(info = {}) {
    log('sdk meyinfo %o', info);
    this.store.dispatch(sdkUpdateMyInfo(info));
  }

  /**
   * 当前用户信息其他段修改同步
   */
  onupdatemyinfo(info = {}) {
    log('sdk updatemyinfo %o', info);
    this.store.dispatch(sdkUpdateMyInfo(info));
  }

  /**
   * 同步最近会话列表回调
   */
  onsessions(sessions = []) {
    log('sdk sessions %o', sessions);
    this.store.putSessions(sessions);

    const updateSessions = sessions.map(session => session.id);
    const totalSessions = this.store.getTotalSessionIds();
    this.store.dispatch(sdkUpdateSessions(updateSessions, totalSessions));
  }

  /**
   * 更新会话的回调
   */
  onupdatesession(s) {
    log('sdk updatesession %o', s);
    const sessions = [s];
    this.store.putSessions(sessions);

    const updateSessions = sessions.map(session => session.id);
    const totalSessions = this.store.getTotalSessionIds();
    this.store.dispatch(sdkUpdateSessions(updateSessions, totalSessions));
  }

  /**
   * 同步漫游消息的回调
   */
  onroamingmsgs({ msgs = [] }) {
    log('sdk roamingmsgs %o', msgs);
    this.store.putMsgs(msgs);
  }

  /**
   * 同步离线消息的回调
   */
  onofflinemsgs({ msgs = [] }) {
    log('sdk offlinemsgs %o', msgs);
    this.store.putMsgs(msgs);
  }

  /**
   * 收到消息的回调
   */
  onmsg(msg) {
    log('sdk onmsg %o', msg);
    this.store.putMsgs([msg]);
  }

  /**
   * 数据同步完成
   */
  onsyncdone() {
    const sessions = this.store.getTotalSessions();
    log('sdk onsyncdone %o', this.store);
    this.store.dispatch(sdkSyncDeon());
    // 获取所有会话中涉及到的人员accid
    const userAccids = sessions
      .map((session) => {
        if (session.scene === SCENE_P2P) {
          return session.to;
        }
        return session.lastMsg ? session.lastMsg.from : null;
      })
      .filter(accid => accid);
    userAccids.push(this.store.get(USER_ACCOUNT).accid);
    // 获取人员信息
    this.getUsers(userAccids);
  }

  /**
   * 批量获取用户信息
   * @param accids
   */
  getUsers(accids = []) {
    log('getUsers accids num %d', accids.length);
    if (accids.length === 0) return Promise.resolve([]);

    // 每50个调用一次,人员信息获取接口
    const ps = [];
    let tmp = null;
    for (let i = 0; i < accids.length; i++) {
      // eslint-disable-next-line no-continue
      if (!accids[i]) continue;
      // eslint-disable-next-line no-continue
      if (this.store.getUserById(accids[i])) continue;
      tmp = tmp || [];
      if (tmp.length < 50) {
        tmp.push(accids[i]);
      } else {
        tmp = [];
        ps.push(this.wrapGetUsersPromise(tmp));
      }
    }
    if (tmp && tmp.length > 0) ps.push(this.wrapGetUsersPromise(tmp));
    return Promise.all(ps).then(data => data.reduce((result, users) => result.concat(users), []));
  }

  /**
   * 包装getUsers方法
   * @param accids
   * @return {Promise}
   */
  wrapGetUsersPromise(accids) {
    return new Promise((resolve) => {
      this.getUsersFromOptions(accids, (users = []) => {
        // 过滤出有accid和nick属性的对象,其他为无效对象
        const tmpUsers = users.filter(user => user && user.accid && user.nick);
        if (users.length !== tmpUsers) log('options.getUsers has invalide user object. %o', users);
        if (users.length > 0) {
          this.store.putUsers(tmpUsers);
          this.store.dispatch(sdkUpdateUser(tmpUsers.map(tmpUser => tmpUser.accid)));
        }
        resolve(tmpUsers);
      });
    });
  }

  /**
   * 设置当前session
   * @param sessionId
   */
  setCurrSession(sessionId) {
    log('sdk set curr session. sessionId:%s', sessionId);
    this.nim.setCurrSession(sessionId);
  }

  /**
   * 重置当前session
   * @param sessionId
   */
  resetCurrSession(sessionId) {
    log('sdk reset curr session. sessionId:%s', sessionId);
    this.nim.resetCurrSession();
  }
}

