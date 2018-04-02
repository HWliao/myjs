import * as Nim from '../../sdk/NIM_Web_NIM_v3.8.0';
import { BaseStoreComponent } from '../store/base-store-component';
import { selectImApiConfig } from '../im-api/selectors';
import { ConfigModel } from '../im-api/model/config.model';
import { ImCoreInterface } from './model/im-core-interface';
import { imCoreConnectAction, imCoreDisconnectAction } from './actions';

export class ImCore extends BaseStoreComponent implements ImCoreInterface {
  private option: NimOptions;
  private nim: NIM;

  constructor() {
    super();
  }

  init = () => {
    const config: ConfigModel = selectImApiConfig(this.store.getState()).toJS();
    this.option = {
      debug: config.thirdPartyDebug || false,
      secure: true,
      appKey: config.appKey || '',
      account: '',
      token: '',
      onconnect: this.onconnect,
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
      db: false
    };
  };

  destroy = () => {
    this.disconnect();
  };

  connect = (accid: string, token: string) => {
    this.option = Object.assign({}, this.option, {account: accid, token});
    this.nim = Nim.getInstance(this.option);
  };

  disconnect = () => {
    if (this.nim) {
      this.nim.disconnect();
    }
  };

  onconnect = () => {
    this.store.dispatch(imCoreConnectAction());
  };
  onwillreconnect = () => {
    console.log('onwillreconnect');
  };
  ondisconnect = () => {
    this.store.dispatch(imCoreDisconnectAction());
  };
  onerror = () => {
    console.log('onerror');
  };
  onloginportschange = () => {
    console.log('onloginportschange');
  };
  onmyinfo = () => {
    console.log('onmyinfo');
  };
  onupdatemyinfo = () => {
    console.log('onupdatemyinfo');
  };
  onsessions = () => {
    console.log('onsessions');
  };
  onupdatesession = () => {
    console.log('onupdatesession');
  };
  onroamingmsgs = () => {
    console.log('onroamingmsgs');
  };
  onofflinemsgs = () => {
    console.log('onofflinemsgs');
  };
  onmsg = () => {
    console.log('onmsg');
  };
  onsyncdone = () => {
    console.log('onsyncdone');
  };
}

export function getImCoreInstance() {
  return new ImCore();
}
