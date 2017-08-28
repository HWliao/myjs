/**
 * embed span hait
 * Created by lenovo on 2017/8/18.
 */
import Quill from 'quill/dist/quill.core';

const Embed = Quill.import('blots/embed');

export default class HaitSpanBlot extends Embed {
  static blotName = 'imHaitSpan';
  static className = 'im-span-hait';
  static tagName = 'span';

  constructor(node) {
    super(node);
    const color = this.domNode.getAttribute('data-hait-color');
    const $span = this.domNode.querySelector('span[contenteditable]');
    if ($span) $span.style.color = color || '#24aeef';
  }

  static create(value) {
    const node = super.create(value);
    node.setAttribute('data-hait-text', value.text);
    node.setAttribute('data-hait-account', value.account);
    node.setAttribute('data-hait-color', value.color || '#24aeef');
    node.innerText = value.text;
    return node;
  }

  static value(node) {
    return {
      text: node.getAttribute('data-hait-text'),
      account: node.getAttribute('data-hait-account'),
    };
  }
}
