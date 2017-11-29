import EventEmiiter from 'eventemitter3';

import '../resource/css/im.css';

import { createDebug, setEnabled } from './utils/log';
import { Store } from './store/store';
import { getConfig } from './config';
import { Sdk } from './sdk';
import { Layout } from './components/layout/layout';
import { hideLayout, showLayout } from './components/layout/layoutAction';
import { Sidebar } from "./components/sidebar/sidebar";

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

    // 显示layout ui
    this.store.dispatch(showLayout());
  }

  login(accid, password) {

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
}
