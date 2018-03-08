import './rxjs';
import { ConfigModel, defaultConfig } from './container/im-api/model/config.model';
import { ImModel } from './container/im-api/model/im.model';
import { getImInstance } from './container/im-api/im';

function createIm(config: ConfigModel = defaultConfig): Promise<ImModel> {
  return getImInstance(config).init();
}

export default {
  createIm,
};
