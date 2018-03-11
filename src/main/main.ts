import { ConfigModel } from './im-api/model/config.model';
import { ImModel } from './im-api/model/im.model';
import { getImInstance } from './im-api/im';

function createIm(config?: ConfigModel, el?: HTMLElement): Promise<ImModel> {
  return Promise.resolve(getImInstance(config, el));
}

export default {
  createIm,
};
