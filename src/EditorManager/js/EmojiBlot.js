/**
 * emoji blot
 * Created by lenovo on 2017/8/16.
 */
import Quill from 'quill/dist/quill.core';

const Embed = Quill.import('blots/embed');

export default class EmojiEmbed extends Embed {
  static blotName = 'imEmoji';
  static className = 'im-emoji';
  static src = 'img';
  static tagName = 'img';
  static ATTRIBUTES = [
    'alt',
    'height',
    'width',
  ];

  static create(value) {
    const node = super.create(value);
    node.setAttribute('data-text', value.text);
    node.setAttribute('alt', value.text);
    node.setAttribute('src', value.img);
    node.setAttribute('width', value.width || 28);
    node.setAttribute('height', value.height || 28);
    return node;
  }

  static formats(domNode) {
    return EmojiEmbed.ATTRIBUTES.reduce((formats, attribute) => {
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
    if (EmojiEmbed.ATTRIBUTES.indexOf(name) > -1) {
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
