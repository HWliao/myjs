/**
 * emoji blot
 * Created by lenovo on 2017/8/16.
 */
import Parchment from 'parchment';

export default class EmojiEmbed extends Parchment.Embed {
  static blotName = 'imEmoji';
  static className = 'im-emoji';
  static tagName = 'img';

  static create(value) {
    const node = super.create(value);
    node.setAttribute('data-text', value.text);
    node.setAttribute('alt', value.text);
    node.setAttribute('src', value.img);
    return node;
  }

  static value(node) {
    return {
      img: node.getAttribute('src'),
      text: node.getAttribute('data-text'),
    };
  }
}
