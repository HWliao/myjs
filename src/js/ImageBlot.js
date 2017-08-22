/**
 * 图片格式
 * Created by lenovo on 2017/8/17.
 */
import Quill from 'quill/dist/quill.core';

const Embed = Quill.import('blots/embed');
const MH = 'maxHeight';
const MW = 'maxWidth';
const TEXT = '[图片]';
export default class ImageBlot extends Embed {
  static blotName = 'imImage';
  // 不能加class,多个img先关的blot实现,其他的以className区分
  // static className = 'im-image';
  static tagName = 'img';
  static src = 'img';
  static ATTRIBUTES = [
    'alt',
    MH,
    MW,
  ];

  static create(value) {
    const node = super.create(value);
    node.setAttribute('data-text', value.text || TEXT);
    node.setAttribute('alt', value.text || TEXT);
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
        formats[attribute] = !formats[attribute] && attribute === 'alt' ? TEXT : formats[attribute];
      }
      return formats;
    }, {});
  }

  static value(node) {
    return {
      img: node.getAttribute('src'),
      text: node.getAttribute('data-text') || TEXT,
    };
  }

  static valueDelta(src) {
    return [{
      [ImageBlot.blotName]: {
        img: src,
        text: TEXT,
      },
    }, {
      alt: TEXT,
      [MH]: 70,
    }];
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
