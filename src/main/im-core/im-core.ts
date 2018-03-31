import { BaseStoreComponent } from '../store/base-store-component';
import { selectImApiConfig } from '../im-api/selectors';
import { ConfigModel } from '../im-api/model/config.model';
import { ImCoreInterface } from './model/im-core-interface';

export class ImCore extends BaseStoreComponent implements ImCoreInterface {
  constructor() {
    super();
  }

  init = () => {
    console.log('core init');
    const config: ConfigModel = selectImApiConfig(this.store.getState()).toJS();
    const options: NimOptions = {
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
    console.log(options);
  };

  destroy = () => {
    console.log('core destroy');
  };

  onconnect = () => {
    // todo
  };
  onwillreconnect = () => {
    // todo
  };
  ondisconnect = () => {
    // todo
  };
  onerror = () => {
    // todo
  };
  onloginportschange = () => {
    // todo
  };
  onmyinfo = () => {
    // todo
  };
  onupdatemyinfo = () => {
    // todo
  };
  onsessions = () => {
    // todo
  };
  onupdatesession = () => {
    // todo
  };
  onroamingmsgs = () => {
    // todo
  };
  onofflinemsgs = () => {
    // todo
  };
  onmsg = () => {
    // todo
  };
  onsyncdone = () => {
    // todo
  };
}

export function getImCoreInstance() {
  return new ImCore();
}
