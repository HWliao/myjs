/**
 * 粘贴和拖拽模块,需要覆盖quill自带的clipboard模块
 * Created by lenovo on 2017/8/21.
 */
import Quill from 'quill/dist/quill.core';
import {
  deltaEndsWith,
  traverse,
  matchAlias,
  matchBlot,
  matchBreak,
  matchIgnore,
  matchIndent,
  matchNewline,
  matchSpacing,
  matchStyles,
  matchText,
} from './uitls';

const Delta = Quill.import('delta');

const DOM_KEY = '__ql-matcher';

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
  // [Node.ELEMENT_NODE, matchAttributor],
  [Node.ELEMENT_NODE, matchStyles],
  ['li', matchIndent],
  ['b', matchAlias.bind(matchAlias, 'bold')],
  ['i', matchAlias.bind(matchAlias, 'italic')],
  ['style', matchIgnore],
];

export default class DropAndClipModule {
  static DEFAULTS = {
    matchers: [],
    matchVisual: true,
  };

  constructor(quill, options) {
    this.quill = quill;
    this.options = options;

    this.quill.root.addEventListener('paste', this.onPaste.bind(this));
    this.container = this.quill.addContainer('ql-clipboard');
    this.container.setAttribute('contenteditable', true);
    this.container.setAttribute('tabindex', -1);
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
    return delta;
  }

  dangerouslyPasteHTML(index, html, source = Quill.sources.API) {
    if (typeof index === 'string') {
      return this.quill.setContents(this.convert(index), html);
    }
    const paste = this.convert(html);
    return this.quill.updateContents(new Delta().retain(index).concat(paste), source);
  }

  onPaste(e) {
    if (e.defaultPrevented || !this.quill.isEnabled()) return;
    const range = this.quill.getSelection();
    let delta = new Delta().retain(range.index);
    const scrollTop = this.quill.scrollingContainer.scrollTop;
    this.container.focus();
    this.quill.selection.update(Quill.sources.SILENT);
    setTimeout(() => {
      delta = delta.concat(this.convert()).delete(range.length);
      this.quill.updateContents(delta, Quill.sources.USER);
      // range.length contributes to delta.length()
      this.quill.setSelection(delta.length() - range.length, Quill.sources.SILENT);
      this.quill.scrollingContainer.scrollTop = scrollTop;
      this.quill.focus();
    }, 1);
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
