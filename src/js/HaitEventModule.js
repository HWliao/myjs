/**
 * keyup事件监听
 * Created by lenovo on 2017/8/21.
 */
import Quill from 'quill/dist/quill.core';

const EDITOR_HAIT_KEYUP = 'editor_hait_keyup';
Quill.events.EDITOR_HAIT_KEYUP = EDITOR_HAIT_KEYUP;

export default class HaitEventModule {
  constructor(quill, options) {
    this.quill = quill;
    this.emitter = quill.emitter;
    this.root = quill.root;
    this.scroll = quill.scroll;
    this.selection = quill.selection;
    this.options = options;
    this.root.addEventListener('keyup', (e) => {
      let flag = false;
      let range = null;
      if (e.key === '@') {
        flag = true;
        range = this.quill.getSelection();
      } else if (e.shiftKey && e.keyCode === 50) {
        flag = true;
        range = this.quill.getSelection();
      } else if ((e.shiftKey && e.keyCode === 229) || e.keyCode === 50) {
        range = this.quill.getSelection();
        const delta = this.quill.getContents(range.index - 1, 1);
        if (delta
          && delta.ops
          && delta.ops.length === 1
          && delta.ops[0]
          && delta.ops[0].insert === '@') {
          flag = true;
        }
      }
      if (flag) {
        range.index -= 1;
        this.emitter.emit(Quill.events.EDITOR_HAIT_KEYUP, range);
      }
    }, false);
  }
}
