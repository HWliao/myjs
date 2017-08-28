/**
 * 粘贴和拖拽模块,需要覆盖quill自带的clipboard模块
 * Created by lenovo on 2017/8/21.
 */
import Quill from 'quill/dist/quill.core';
import {
  deltaEndsWith,
  traverse,
  matchBlot,
  matchBreak,
  matchIgnore,
  matchIndent,
  matchNewline,
  matchSpacing,
  matchStyles,
  matchText,
  readBlobAsDataURL,
} from './uitls';
import ImageBlot from './ImageBlot';

const Delta = Quill.import('delta');
const Parchment = Quill.import('parchment');

const DOM_KEY = '__ql-matcher';

const DROP_AND_COPY_FILE = 'drop_and_copy_file';
const DROP_AND_COPY_INVALID_IMAGE = 'drop_and_copy_invalid_image';

Quill.events.DROP_AND_COPY_FILE = DROP_AND_COPY_FILE;
Quill.events.DROP_AND_COPY_INVALID_IMAGE = DROP_AND_COPY_INVALID_IMAGE;

const IM_DRAG_INPUT = 'im.drag.input';

// 我们这里不要任何样式
// const ATTRIBUTE_ATTRIBUTORS = [
//  AlignAttribute,
//  DirectionAttribute
// ].reduce(function(memo, attr) {
//  memo[attr.keyName] = attr;
//  return memo;
// }, {});
//
// const STYLE_ATTRIBUTORS = [
//  AlignStyle,
//  BackgroundStyle,
//  ColorStyle,
//  DirectionStyle,
//  FontStyle,
//  SizeStyle
// ].reduce(function(memo, attr) {
//  memo[attr.keyName] = attr;
//  return memo;
// }, {});

const CLIPBOARD_CONFIG = [
  [Node.TEXT_NODE, matchText],
  [Node.TEXT_NODE, matchNewline],
  ['br', matchBreak],
  [Node.ELEMENT_NODE, matchNewline],
  [Node.ELEMENT_NODE, matchBlot],
  [Node.ELEMENT_NODE, matchSpacing],
  [Node.ELEMENT_NODE, matchStyles],
  ['li', matchIndent],
  ['style', matchIgnore],
];

export default class DropAndClipModule {
  static DEFAULTS = {
    matchers: [],
    matchVisual: true,
    dealImg: src => new Promise(resolve => setTimeout(resolve(src), 1)),
    isValidImg: blob => blob.size < 2 * 1024 * 1024,
  };

  constructor(quill, options) {
    this.quill = quill;
    this.options = options;

    this.quill.root.addEventListener('drop', this.onDrop.bind(this));
    this.quill.root.addEventListener('dragstart', this.onDragstart.bind(this));
    this.quill.root.addEventListener('paste', this.onPaste.bind(this));
    this.container = this.quill.addContainer('ql-clipboard');
    this.container.setAttribute('contenteditable', 'true');
    this.container.setAttribute('tabindex', '-1');
    this.matchers = [];
    CLIPBOARD_CONFIG.concat(this.options.matchers).forEach(([selector, matcher]) => {
      if (!options.matchVisual && matcher === matchSpacing) return;
      this.addMatcher(selector, matcher);
    });
  }

  addMatcher(selector, matcher) {
    this.matchers.push([selector, matcher]);
  }

  convert(html) {
    if (typeof html === 'string') {
      this.container.innerHTML = html.replace(/>\r?\n +</g, '><'); // Remove spaces between tags
    }
    const [elementMatchers, textMatchers] = this.prepareMatching();
    let delta = traverse(this.container, elementMatchers, textMatchers);
    // Remove trailing newline
    if (deltaEndsWith(delta, '\n') && delta.ops[delta.ops.length - 1].attributes == null) {
      delta = delta.compose(new Delta().retain(delta.length() - 1).delete(1));
    }
    this.container.innerHTML = '';
    const ps = [];
    const matcherMap = {};
    const map = {};
    if (delta && delta.ops && delta.ops.length > 0) {
      delta.ops.forEach((tDelta) => {
        if (typeof tDelta.insert !== 'object') return;
        const blotName = Object.keys(tDelta.insert)[0];
        const matcher = Parchment.query(blotName);
        if (!matcher || !matcher.src) return;
        ps.push(this.options.dealImg(tDelta.insert[blotName][matcher.src]));
        map[ps.length - 1] = tDelta.insert;
        matcherMap[ps.length - 1] = matcher;
      });
    }
    if (ps.length > 0) {
      return Promise
        .all(ps)
        .then((bImgs) => {
          for (let i = 0; i < bImgs.length; i++) {
            const matcher = matcherMap[i];
            map[i][matcher.blotName][matcher.src] = bImgs[i];
          }
          return delta;
        });
    }
    return Promise.resolve(delta);
  }

  // eslint-disable-next-line class-methods-use-this
  dangerouslyPasteHTML() {
    throw new Error('this method is not worked!');
    //    if (typeof index === 'string') {
    //      return this.quill.setContents(this.convert(index), html);
    //    }
    //    const paste = this.convert(html);
    //    return this.quill.updateContents(new Delta().retain(index).concat(paste), source);
  }

  onPaste(e) {
    if (e.defaultPrevented || !this.quill.isEnabled()) return;
    if (!this.quill.hasFocus()) this.quill.focus();
    if (this.dropAndPaste(e)) {
      e.preventDefault();
      return;
    }
    const range = this.quill.getSelection();
    let delta = new Delta().retain(range.index);
    const scrollTop = this.quill.scrollingContainer.scrollTop;
    this.container.focus();
    this.quill.selection.update(Quill.sources.SILENT);
    setTimeout(() => {
      this.convert()
        .then((deltas) => {
          delta = delta.concat(deltas).delete(range.length);
          this.quill.updateContents(delta, Quill.sources.USER);
          // range.length contributes to delta.length()
          this.quill.setSelection(delta.length() - range.length, Quill.sources.USER);
          this.quill.scrollingContainer.scrollTop = scrollTop;
          this.quill.focus();
        })
        .catch(err => this.quill.emitter.emit('error', err));
    }, 1);
  }

  // eslint-disable-next-line class-methods-use-this
  onDragstart(e) {
    e.dataTransfer.setData(IM_DRAG_INPUT, true);
  }

  onDrop(e) {
    if (e.defaultPrevented || !this.quill.isEnabled()) return;
    const from = e.dataTransfer.getData(IM_DRAG_INPUT);
    if (from) {
      setTimeout(() => this.quill.selection.update(Quill.sources.USER), 1);
      return;
    }
    e.stopPropagation();
    e.preventDefault();
    if (!this.quill.hasFocus()) this.quill.focus();
    if (this.dropAndPaste(e)) {
      return;
    }
    const html = e.dataTransfer.getData('text/html') || e.dataTransfer.getData('text/plain');
    const range = this.quill.getSelection();
    let delta = new Delta().retain(range.index);
    const scrollTop = this.quill.scrollingContainer.scrollTop;
    this.convert(html)
      .then((deltas) => {
        delta = delta.concat(deltas).delete(range.length);
        this.quill.updateContents(delta, Quill.sources.USER);
        // range.length contributes to delta.length()
        this.quill.setSelection(delta.length() - range.length, Quill.sources.USER);
        this.quill.scrollingContainer.scrollTop = scrollTop;
        this.quill.focus();
      })
      .catch(err => this.quill.emitter.emit('error', err));
  }

  dropAndPaste(e) {
    const dataTransfer = e.clipboardData || e.dataTransfer;
    const items = dataTransfer && dataTransfer.items;
    const images = [];
    const files = [];
    const invalideImages = [];
    if (items && items.length > 0) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].kind === 'file' && items[i].type.indexOf('image/') > -1) {
          if (this.options.isValidImg(items[i].getAsFile())) {
            images.push(items[i].getAsFile());
          } else {
            invalideImages.push(items[i].getAsFile());
          }
        } else if (items[i].kind === 'file') {
          files.push(items[i].getAsFile());
        }
      }
    }

    let flag = false;
    if (files.length > 0) {
      // 只要存在文件,全部以文件形式发送
      this.quill.emitter.emit(DROP_AND_COPY_FILE, [].concat(files, invalideImages, images));
      flag = true;
    }
    if (files.length === 0 && invalideImages.length > 0) {
      this.quill.emitter.emit(DROP_AND_COPY_INVALID_IMAGE, invalideImages);
      flag = true;
    }
    if (files.length === 0 && images.length > 0) {
      flag = true;
      // 有效图片转base64
      const range = this.quill.getSelection();
      let delta = new Delta().retain(range.index);
      const scrollTop = this.quill.scrollingContainer.scrollTop;
      Promise
        .all(images.map(image => readBlobAsDataURL(image)))
        .then((bImgs) => {
          const imageDeltas = bImgs.reduce((delta1, bImg) => {
            if (bImg) {
              return delta1.concat(new Delta().insert(...ImageBlot.valueDelta(bImg)));
            }
            return delta1;
          }, new Delta());

          delta = delta.concat(imageDeltas).delete(range.length);
          this.quill.updateContents(delta, Quill.sources.USER);
          // range.length contributes to delta.length()
          this.quill.setSelection(delta.length() - range.length, Quill.sources.SILENT);
          this.quill.scrollingContainer.scrollTop = scrollTop;
          this.quill.focus();
        })
        .catch(err => this.quill.emitter.emit('error', err));
    }
    return flag;
  }

  prepareMatching() {
    const elementMatchers = [];
    const textMatchers = [];
    this.matchers.forEach((pair) => {
      const [selector, matcher] = pair;
      switch (selector) {
        case Node.TEXT_NODE:
          textMatchers.push(matcher);
          break;
        case Node.ELEMENT_NODE:
          elementMatchers.push(matcher);
          break;
        default:
          [].forEach.call(this.container.querySelectorAll(selector), (node) => {
            // TODO use weakmap
            // eslint-disable-next-line no-param-reassign
            node[DOM_KEY] = node[DOM_KEY] || [];
            // eslint-disable-next-line no-param-reassign
            node[DOM_KEY].push(matcher);
          });
          break;
      }
    });
    return [elementMatchers, textMatchers];
  }
}
