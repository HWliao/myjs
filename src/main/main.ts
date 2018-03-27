import { ConfigModel } from './im-api/model/config.model';
import { ImModel } from './im-api/model/im.model';
import { storeConfigure } from './store/stroe';
import { createDependencies, EpicsDependencies } from './store/epics';

/**
 * 不初始化,主要进行资源加载和创建im实例
 * @return {Promise<ImModel>}
 */
function createIm(): Promise<ImModel> {
  const dependencies: EpicsDependencies = createDependencies();
  storeConfigure(dependencies);
  return Promise.resolve(dependencies.api);
}

/**
 * 进行初始化
 * @param {ConfigModel} config
 * @param {HTMLElement} el
 * @return {Promise<ImModel>}
 */
function createImAndInit(config: ConfigModel, el?: HTMLElement): Promise<ImModel> {
  return createIm().then((im) => {
    im.setConfig(config);
    return im.init(el).then(() => im);
  });
}

export default {
  createIm,
  createImAndInit,
};
