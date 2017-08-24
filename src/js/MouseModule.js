/**
 * 鼠标先关事件动作
 * Created by lenovo on 2017/8/21.
 */
import Quill from 'quill/dist/quill.core';

const EDITOR_CONTEXT_MENU = 'editor_context_menu';
const IMG_DBLCLICK = 'img_dblclick';
Quill.events.EDITOR_CONTEXT_MENU = EDITOR_CONTEXT_MENU;
Quill.events.IMG_DBLCLICK = IMG_DBLCLICK;

const Parchment = Quill.import('parchment');

export default class MouseModule {
  constructor(quill, options) {
    this.quill = quill;
    this.emitter = quill.emitter;
    this.root = quill.root;
    this.scroll = quill.scroll;
    this.selection = quill.selection;
    this.options = options;
    this.root.addEventListener('mousedown', (e) => {
      if (e.button === 2) {
        e.preventDefault();
        e.stopPropagation();
      }
    }, false);
    this.root.addEventListener('contextmenu', (e) => {
      e.stopPropagation();
      e.preventDefault();
      let range = this.quill.getSelection(true);
      const isSelected = range && range.length > 0;
      const isImg = e.target.nodeName.toUpperCase() === 'IMG';
      if (!isSelected && !isImg) {
        // 1.没有选中内容,点击非图片
      } else if (!isSelected && !isImg) {
        // 2.没有选中内容,点击图片
        this.selectEmbed(e);
        range = this.quill.getSelection();
      } else if (isSelected && !isImg) {
        // 2.选中内容,点击非图片
      } else {
        // 3.选中内容,点击图片

        const blot = Parchment.find(e.target, true);
        const index = blot.offset(this.scroll);
        if (index >= range.index && index < range.index + range.length) {
          // 图片在选中内容中,不做处理
        } else {
          // 不在选中内容中,选中单前图片
          this.selectEmbed(e);
          range = this.quill.getSelection();
        }
      }
      this.emitter.emit(EDITOR_CONTEXT_MENU, this.quill.getContents(range.index, range.length), e);
    }, false);
    this.root.addEventListener('dblclick', (e) => {
      if (e.target.nodeName.toUpperCase() === 'IMG') {
        e.preventDefault();
        const img = e.target;
        const imgs = this.quill.root.querySelectorAll('img');
        let index = -1;
        for (let i = 0; i < imgs.length; i++) {
          if (img === imgs[i]) index = i;
        }
        if (index !== -1) {
          this.emitter.emit(IMG_DBLCLICK, {
            index,
            imgs,
          });
        }
      }
    }, false);
  }

  selectEmbed(e) {
    const blot = Parchment.find(e.target, true);
    const selectedNode = document.querySelector('.ql-embed-selected');
    if (selectedNode) {
      selectedNode.classList.remove('ql-embed-selected');
    }
    if (blot instanceof Parchment.Embed) {
      blot.domNode.classList.add('ql-embed-selected');
      const range = {
        index: blot.offset(this.scroll),
        length: blot.length(),
      };
      this.selection.setRange(range, Quill.sources.USER);
      e.stopPropagation();
    }
  }
}
