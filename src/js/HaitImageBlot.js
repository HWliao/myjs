/**
 * hait格式 image方式实现
 * Created by lenovo on 2017/8/17.
 */
import Quill from 'quill/dist/quill.core';

const Embed = Quill.import('blots/embed');

export default class HaitImageBlot extends Embed {
  static blotName = 'imHaitImage';
  static className = 'im-image-hait';
  static src = 'img';
  static tagName = 'img';

  static create(value) {
    const node = super.create(value);
    node.setAttribute('data-hait-text', value.text);
    node.setAttribute('data-hait-account', value.account);
    node.setAttribute('src', value.img);
    return node;
  }

  static value(node) {
    return {
      img: node.getAttribute('src'),
      text: node.getAttribute('data-hait-text'),
      account: node.getAttribute('data-hait-account'),
    };
  }
}
