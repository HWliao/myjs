import { Injectable } from '@angular/core';
import { ConfigModel } from './config.model';

/**
 * 配置管理
 * @author lhw
 */
@Injectable()
export class ConfigService {

  /**
   * 配置项
   */
  private config: ConfigModel;

  constructor() {
    this.config = new ConfigModel();
  }

  /**
   * 设置配置
   * @param {ConfigModel} config
   */
  setConfig(config = new ConfigModel()) {
    this.config = Object.assign({}, this.config, config);
  }

}
