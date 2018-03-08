import { ImModel } from './model/im.model';
import { mount, unmount } from '../im-root';
import { ConfigModel } from './model/config.model';

class Im implements ImModel {

  private $root: HTMLElement;

  constructor() {
    this.$root = document.createElement('div');
    this.$root.style.position = 'absolute';
    this.$root.style.left = '-1px';
    this.$root.style.width = '0px';
    this.$root.style.height = '0px';
    document.body.appendChild(this.$root);
  }

  init = () => {
    return mount(this.$root).then(() => this);
  };

  destroy = () => {
    return Promise.resolve(unmount(this.$root));
  };
}

let _im: ImModel;

export function getImInstance(config: ConfigModel) {
  if (!_im) {
    _im = new Im();
  }
  return _im;
}
