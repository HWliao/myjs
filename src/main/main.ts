import './rxjs';
import { ConfigModel, defaultConfig } from './im-api/model/config.model';
import { ImModel } from './im-api/model/im.model';
import { getImInstance } from './im-api/im';

function createIm(config: ConfigModel = defaultConfig): Promise<ImModel> {
  return getImInstance(config).init();
}

export default {
  createIm,
};
