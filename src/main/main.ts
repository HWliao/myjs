import { ConfigModel, defaultConfig } from './im-api/model/config.model';
import { ImModel } from './im-api/model/im.model';

let _im: ImModel;

function createIm(config: ConfigModel = defaultConfig): Promise<ImModel> {
  if (_im) {
    _im = {
      init: () => '',
      destroy: () => ''
    };
  }
  return Promise.resolve(_im);
}

export default {
  createIm,
};
