import { ConfigModel } from './im-api/model/config.model';
import { ImModel } from './im-api/model/im.model';
import { getImInstance } from './im-api/im';

/**
 * 不初始化,主要进行资源加载和创建im实例
 * @param {ConfigModel} config
 * @param {HTMLElement} el
 * @return {Promise<ImModel>}
 */
function createIm(config?: ConfigModel, el?: HTMLElement): Promise<ImModel> {
  return Promise.resolve(getImInstance(config, el));
}

/**
 * 进行初始化
 * @param {ConfigModel} config
 * @param {HTMLElement} el
 * @return {Promise<ImModel>}
 */
function createImAndInit(config: ConfigModel, el?: HTMLElement): Promise<ImModel> {
  return createIm(config, el).then((im) => {
    return im.init().then(() => im);
  });
}

export default {
  createIm,
  createImAndInit,
};
