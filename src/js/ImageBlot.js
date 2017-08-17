/**
 * 图片格式
 * Created by lenovo on 2017/8/17.
 */
import Quill from 'quill/dist/quill.core';

const Embed = Quill.import('blots/embed');
const MH = 'maxHeight';
const MW = 'maxWidth';
export default class ImageBlot extends Embed {
  static blotName = 'imImage';
  static className = 'im-image';
  static tagName = 'img';
  static ATTRIBUTES = [
    'alt',
    MH,
    MW,
  ];

  static create(value) {
    const node = super.create(value);
    node.setAttribute('data-text', value.text);
    node.setAttribute('alt', value.text);
    node.setAttribute('src', value.img);
    // 高度必须做出限制
    node.style[MH] = value[MH] ? `${value[MH]}px` : '70px';
    if (value[MW]) node.style[MW] = `${value[MW]}px`;
    node.setAttribute(MH, node.style[MH]);
    node.setAttribute(MW, node.style[MW]);
    return node;
  }

  static formats(domNode) {
    return ImageBlot.ATTRIBUTES.reduce((formats, attribute) => {
      if (domNode.hasAttribute(attribute)) {
        /* eslint-disable no-param-reassign */
        formats[attribute] = domNode.getAttribute(attribute);
      }
      return formats;
    }, {});
  }

  static value(node) {
    return {
      img: node.getAttribute('src'),
      text: node.getAttribute('data-text'),
    };
  }

  format(name, value) {
    if (name === MH || name === MW) {
      this.domNode.style[name] = value ? `${value}px` : '';
    }

    if (ImageBlot.ATTRIBUTES.indexOf(name) > -1) {
      if (value) {
        this.domNode.setAttribute(name, value);
      } else {
        this.domNode.removeAttribute(name);
      }
    } else {
      super.format(name, value);
    }
  }
}
