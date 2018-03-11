import { ConfigModel } from './config.model';

export interface ImModel {
  /**
   * 初始化
   * @returns {Promise<any>}
   */
  init: () => Promise<any>;

  /**
   * 销毁
   * @returns {Promise<any>}
   */
  destroy: () => Promise<any>;

  /**
   * 显示/隐藏
   * @param {boolean} show
   */
  toggleShow: (show?: boolean) => void;

  /**
   * 展开/收起
   * @param {boolean} up
   */
  toggleUp: (up?: boolean) => void;

  /**
   * 是否已经初始化
   * @returns {boolean}
   */
  isInited: () => boolean;

  /**
   * 是否已经显示
   * @returns {boolean}
   */
  isShow: () => boolean;

  /**
   * 是否已经展开
   * @returns {boolean}
   */
  isUp: () => boolean;

  /**
   * 设置配置对象
   * @param {ConfigModel} config
   */
  setConfig: (config: ConfigModel) => void;

  /**
   * 获取配置对象
   * @returns {ConfigModel}
   */
  getConfig: () => ConfigModel;
}
