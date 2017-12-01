import EventEmitter from 'eventemitter3';
import NIM from '../vender/nim-sdk/NIM_Web_NIM_v3.8.0';

import { createDebug } from './utils/log';
import { SDK_CONNECT_COUNT, USER_ACCOUNT } from './model/state';
import { error, sdkConnected, sdkDisconnected, sdkWillConnect } from './store/action';

const log = createDebug('im:sdk');

export class Sdk extends EventEmitter {
  constructor(options, store) {
    super();
    log('sdk construct... options:%o', options);
    this.options = this.getOptions(options);
    this.store = store;
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
      syncRoamingMsgs: false,
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
  onloginportschange() {
    log('sdk loginportschange %o', this);
  }

  /**
   * 同步登录用户名片的回调
   */
  onmyinfo() {
    log('sdk meyinfo %o', this);
  }

  /**
   * 当前用户信息其他段修改同步
   */
  onupdatemyinfo() {
    log('sdk updatemyinfo %o', this);
  }

  /**
   * 同步最近会话列表回调
   */
  onsessions() {
    log('sdk sessions %o', this);
  }

  /**
   * 更新会话的回调
   */
  onupdatesession() {
    log('sdk updatesession %o', this);
  }

  /**
   * 同步离线消息的回调
   */
  onofflinemsgs() {
    log('sdk offlinemsgs %o', this);
  }

  /**
   * 收到消息的回调
   */
  onmsg() {
    log('sdk onmsg %o', this);
  }

  /**
   * 数据同步完成
   */
  onsyncdone() {
    log('sdk onsyncdone %o', this);
  }
}
