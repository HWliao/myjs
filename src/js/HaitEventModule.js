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
      if (!e.shiftKey) return;
      const keyCode = e.which || e.keyCode;
      if (e.key === '@' || keyCode === 50 || keyCode === 229) {
        if (!this.quill.hasFocus()) return;
        const range = this.quill.getSelection();
        const delta = this.quill.getContents(range.index - 1, 1);
        if (delta
          && delta.ops
          && delta.ops.length === 1
          && delta.ops[0]
          && delta.ops[0].insert === '@') {
          range.index -= 1;
          this.emitter.emit(Quill.events.EDITOR_HAIT_KEYUP, range);
        }
      }
    }, false);
  }
}
